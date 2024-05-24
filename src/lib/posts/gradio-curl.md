---
title: "How to curl a Gradio App"
date: "2024-05-08"
updated: "2024-05-08"
categories:
  - "gradio"
  - "api"
  - "curl"
coverWidth: 16
coverHeight: 9
coverImage: /images/curl_post.png
showCoverImage: false
excerpt: Learn how to use d Gradio's API via curl 💪
---

<script> 
import Accordion from '$lib/components/Accordion.svelte'; 
</script>

It is possible to use a Gradio application programmatically from curl (or any programming language) but this is currently not documented well.
The Gradio team is working on adding documentation for curl to every gradio application automatically so this post aims to fill the gap in the meantime. Without further ado, let's get started.

### The Setup

Make sure you have `gradio >= 4.20.0` installed on your system. For this post we'll be using the following demo that mimics a diffusion model.

<Accordion title={"The App"}>

```python
import gradio as gr
import numpy as np
import time

def fake_diffusion(steps):
    rng = np.random.default_rng()
    for i in range(steps):
        time.sleep(1)
        image = rng.random(size=(600, 600, 3))
        yield image
    image = np.ones((1000,1000,3), np.uint8)
    image[:] = [255, 124, 0]
    yield image


demo = gr.Interface(fake_diffusion,
                    inputs=gr.Slider(1, 10, 3, step=1),
                    outputs="image")

if __name__ == "__main__":
    demo.launch()
```
</Accordion>

Now run this file and note the URL that the application is running on. 
By default it will be `http://127.0.0.1:7860`


### Using curl

Starting with Gradio version `4.20.0`, every application exposes two routes that make programmatic usage very straightforward. 

These routes are:

- POST `/call/<api-name>` - This adds the request to Gradio's queue and gives back a unique ID.
- GET `/call/<api-name>/<ID>` - This streams the results of the prediction using server-sent-events.

To use an app via curl, combine these two routes!

Let's apply this approach to the demo we previously launched.

The first step is to find out the data that the `/call/<api-name>` route expects. 
We can see the expected parameters and `api-name` by clicking on the `View API` button in the footer of the application.
In this case the `api-name` is `/predict` and it takes a single parameter - the number of steps to run the diffusion process.

<Accordion title={"View API Page"}>

![View API Page](/images/view_api_page.png)

</Accordion>

The JSON data will look like the following.
Note that in the case of multiple parameters, the `data` key will always accept a list of values in the order that they are displayed in the `View API` page.
```json
{
    "data": [9]
}
```

Now let's run both requests!
First, is the POST request. 
In this case, I get an `event_id` of `09a0e5cd22a341d5aa1d01ba0c401451`.

```bash
curl -X POST -H "Content-Type: application/json" -d '{"data": [9]}' http://127.0.0.1:7860/call/predict
```

<Accordion title={"POST request screenshot"}>

![View API Page](/images/curl_post.png)

</Accordion>


Then I send the GET request in stream mode:

```bash
curl -N http://127.0.0.1:7860/call/predict/09a0e5cd22a341d5aa1d01ba0c401451
```


<Accordion title={"GET request screenshot"}>

![View API Page](/images/curl_get.png)

</Accordion>

The get request will stream the predictions using `server-sent events`.
Each event will have an `event key` and the data associated with the event.
There are four event keys:

- `generating` - this is an intermediate result of the request. In this case, it's an image in the diffusion process.
- `completed` - the request is finished and the final prediction is ready.
- `heartbeat` - sent every 15 seconds to keep the request alive.
- `error` - something went wrong.

Files are returned as dictionaries with several keys but the most important is `url` which is the complete url we can use to fetch the generated file from the Gradio server.


### Things to keep in mind

We worked through a simple Gradio application but the same approach will work for more complex cases.
There are a few things you should keep in mind that we didn't need for this example:

**Files must be uploaded if they are used as inputs to a request**

You can upload files to the server using multipart form uploads using the `/upload` route. Here is an example of how to do that with curl

```bash
curl -F files=@<path-to-file> <gradio-url>/upload
```

This will return a list of the paths the files were uploaded to in the server. You can then provide the following json payload for the file-based inputs in the `/call/predict` route:


```json
{
    "orig_name": "example.jpg",
    "path": "/path/in/server/to/example.jpg",
    "url": "https:/example.com/example.jpg",
    "meta": {"_type": "gradio.FileData"}
}
```

Note that if the file is already publicly available via a URL, then the `path` field can be null.

**You can provide a session_hash to uniquely identify your session**

The `POST` route accepts a `session_hash` key in the JSON data.
Some applications (typically chatbots) use `gr.State` to keep track of the session history.
In order for subsequent requests to use the right state, send the same `session_hash` for all `POST` requests.

### Conclusion

You can query any Gradio application with `curl`, or any programming language, by combining the two `/call/<api-name>` routes. 