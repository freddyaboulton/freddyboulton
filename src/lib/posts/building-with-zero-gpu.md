---
title: "Bootstrapping Apps with Gradio and ZeroGPU 🥾"
date: "2024-06-27"
updated: "2024-06-27"
categories:
  - "gradio"
  - "API"
  - "clients"
coverWidth: 16
coverHeight: 9
coverImage: /images/bootstrapping_gradio.png
showCoverImage: false
excerpt: Use Gradio spaces hosted on HuggingFace to bootstrap your next application with state of the art AI capabilities.
---

<script> 
import Accordion from '$lib/components/Accordion.svelte'; 
</script>

<svelte:head>
    <script
        type="module"
        src="https://gradio.s3-us-west-2.amazonaws.com/4.37.1/gradio.js"
    ></script>
</svelte:head>

Bootstrapping refers to creating something (a business, an application) with the resources at hand. In this post, we'll be "bootstrapping" an entirely new application from public [Hugging Face Spaces](https://huggingface.co/spaces). The Gradio [client libraries](https://www.gradio.app/docs/python-client/client) will be crucial to this effort.

The app we'll be building is a "Compliment Bot". Our users will upload a photo of themselves and our bot will generate a nice compliment based on the image and hopefully cheer up their day!


## Spaces as Building Blocks

All Gradio applications expose a REST API that you can use from your own software apps.
Basically, every Gradio application in the world is a building block you can use to add AI functionality to your app!

The best place to look for interesting Gradio applications is on the Hugging Face Hub - there are upwards of ten thousand Gradio applications.
In particular, we'll be looking at [ZeroGPU](https://huggingface.co/zero-gpu-explorers) spaces. ZeroGPU spaces are gradio apps that are backed by a "serverless" cluster GPUs. This cluster is free to use and naturally handles spikes in incoming traffic. Best of all, they are free to use!

This [page](https://huggingface.co/spaces/enzostvs/zero-gpu-spaces) has all of the spaces running on ZeroGPU. We will use it to find spaces that can help us build the Compliment Bot.


## Finding Our Building Blocks

For our Compliment Bot, we'll need to do two things. The first is to get a textual understanding of the image and secondly we'll use that LLM to turn that description into a compliment.

For the first task, we'll use an image captioning model. After looking through the list of ZeroGPU spaces, I settled on [gokaygokay/SD3-Long-Captioner](https://huggingface.co/spaces/gokaygokay/SD3-Long-Captioner). After playing with it, I saw that it generated very detailed descriptions of the subject of an image.
For the second task, a small-ish LLM should do the trick and so I settled on the Zephyr 7B model. I know from previous experience the Zephyr class of models is strong and this space has it running on Zero GPU - [hysts/zephyr-7b](https://huggingface.co/spaces/hysts/zephyr-7b).


## Building Our App with Gradio

The fastest way to build an AI application is by using [Gradio](https://github.com/gradio-app/gradio) so that's what we'll use first. I will also show how you can build the same app with vanilla HTML and javascript.

To begin, we'll import the necessary python packages (Make sure you install gradio with `pip install gradio` beforehand). The `gradio_client` library comes installed with `gradio` and it is what we'll be using to interact with the spaces programmatically. You can do the same with just the `requests` module but using the client is far far easier and quicker.

<Accordion title={"Imports"}>

```python
# This can go in any python file (mine is called app.py)

import gradio as gr
from gradio_client import Client, handle_file
```
</Accordion>


Then we'll use the `Client` class to connect to the two spaces we found before - 

<Accordion title={"Connecting to our spaces"}>

```python
captioning_space = Client("gokaygokay/SD3-Long-Captioner")
llm_space = Client("hysts/zephyr-7b")
```

</Accordion>

In order to generate the compliment, we'll "chain" these two spaces together. First, I'll generate the caption by sending the image to the `SD3-Long-Captioner` space via the `predict` method. Then we'll send the caption to our LLM space and stream the generation by yielding each successive token with a for loop.

I'm omitting the `SYSTEM_PROMPT` I'm using for brevity but I will link the full source code at the end of this section.

<Accordion title={"Generating the Compliment"}>

```python
def generate_compliment(img):
    caption = captioning_space.predict(handle_file(img), api_name="/create_captions_rich")
    for partial_response in llm_space.submit(
		message=f"Caption: {caption}\nCompliment: ",
		system_prompt=SYSTEM_PROMPT,
		max_new_tokens=1024,
		temperature=0.7,
		top_p=0.95,
		top_k=50,
		repetition_penalty=1,
		api_name="/chat"):        
        yield ("# " + partial_response).replace("\"", "")
```

</Accordion>


The last bit is the easiest (and most fun) part. Building the UI!

<Accordion title={"The UI"}>

```python
with gr.Blocks() as demo:
    gr.Markdown(
        f"<h1 style='text-align: center; margin-bottom: 1rem'>ComplimentBot💖</h1>"
    )
    img = gr.Image(type="filepath")
    markdown = gr.Markdown()
    img.upload(generate_compliment, [img], [markdown])
    img.clear(lambda: "", None, markdown)

demo.launch()
```

</Accordion>

All it took was ~30 lines of python code! You can play with the bot (and see all the source code) [here](https://huggingface.co/spaces/freddyaboulton/compliment-bot).
I'm leaving a sample generation here so you can see.

<Accordion title={"Sample Generation"}>

![A sample generation of the compliment bot](/static/images/compliment-bot-gradio.png)

</Accordion>


## Building Our App with HTML/js

The gradio clients are portable so you are not limited to only building Gradio apps.
You can use the python client in your preferred web framework (Django, Flask) and the javascript client can bring Gradio to all browsers.

We can build a Compliment Bot using just HTML and javascript. I'll only show the code related to the gradio client but you can see the full implementation (and play with the bot) [here](https://huggingface.co/spaces/freddyaboulton/compliment-bot-static).


<Accordion title={"An HTML/js Application"}>

```js
const client_lib = await import("https://cdn.jsdelivr.net/npm/@gradio/client@1.2.0/dist/index.min.js");
const Client = client_lib.Client;
const handle_file = client_lib.handle_file;
const captioning_space = await Client.connect("gokaygokay/SD3-Long-Captioner");
const llm_space = await Client.connect("hysts/zephyr-7b");

const caption = await captioning_space.predict("/create_captions_rich", { image: file });


const submission = llm_space.submit("/chat", {
    system_prompt: SYSTEM_PROMPT,
    message: `Caption: ${caption.data}\nCompliment: `,
    max_new_tokens: 1024,
    temperature: 0.7,
    top_p: 0.95,
    top_k: 50,
    repetition_penalty: 1,
}
)

for await (const msg of submission) {
    loader.style.display = 'none';
    if (msg.type === "data") {
        console.log("msg.data", msg.data);
        compliment.textContent = msg.data[0]
    }
}
```

</Accordion>

<Accordion title={"Sample Generation from HTML/javascript app"}>

![A sample generation of the compliment bot implemented in vanilla HTML and javascript](/static/images/compliment-bot-static.png)

</Accordion>


## Conclusion

It's possible to use public Gradio applications as the building blocks of entirely new applications.
The Gradio ecosystem can help you quickly experiment and iterate for free.
In order to turn our Compliment Bot into a "production application", I'd move the spaces we're using into private spaces using dedicated hardware but everything else can stay the same!

Here are all the resources we used in this project:

* [Gradio client docs](https://www.gradio.app/docs/python-client/client)
* [ZeroGPU Spaces](https://huggingface.co/spaces/enzostvs/zero-gpu-spaces)
* [gokaygokay/SD3-Long-Captioner space](https://huggingface.co/spaces/gokaygokay/SD3-Long-Captioner)
* [hysts/zephyr-7b space](https://huggingface.co/spaces/hysts/zephyr-7b)


And here are the apps we built - 

### The Gradio App

<gradio-app src="https://freddyaboulton-compliment-bot.hf.space"></gradio-app>


### The HTML/javascript App

<iframe
	src="https://freddyaboulton-compliment-bot-static.static.hf.space"
	frameborder="0"
	width="850"
	height="450"
></iframe>


