---
title: "Monitor you Gradio app with Logfire 🔍"
date: "2024-05-15"
updated: "2024-05-15"
categories:
  - "gradio"
  - "observability"
  - "pydantic"
coverWidth: 16
coverHeight: 9
excerpt: A first look at Pydantic Logfire to monitor production gradio applications
---

<script> 
import Accordion from '$lib/components/Accordion.svelte'; 
</script>


The Pydantic team recently released [Logfire](https://pydantic.dev/logfire) an observability platform which promises "Uncomplicated observability". 
Gradio developers have asked before about the best way to monitor their applications so I figured I would give Logfire a try to see if I could recommend it in the future. 

## Setup

The setup is painless. Simply go to the [Logfire](https://pydantic.dev/logfire) website and link your Github account. As of writing this, Logfire is in beta and is free. Once logged in, create a new project and store the generated API key someplace safe.

<Accordion title={'Logfire project page'}>

![Project Page](/images/logfire_project_page.png)

</Accordion>


Now create a new directory in your computer, set up a virtual environment of your choice, and install the following dependencies

<Accordion title={'Dependencies'}>

```bash
logfire[fastapi]
gradio
python-dotenv
```

</Accordion>


## The Gradio application

For this demo, I wanted to build something quick but reflective of the kinds of apps being built in the AI era. So I went with a text-to-image Gradio application using the **free** [Hugging Face Inference API](https://huggingface.co/docs/huggingface_hub/guides/inference#getting-started).

You can check out the code below. It's a standard [Blocks](https://www.gradio.app/docs/gradio/blocks) application with a textbox input and image output. I am doing two custom things however:

1. I am mounting the Gradio application as a sub-application of a parent FastAPI application. This will make integration with logfire easier.
2. I am applying my own css to create a square UI in the center of the page. Feel free to remove if you are following along.

<Accordion title={'Gradio Application Code'}>

```python
import gradio as gr
from fastapi import FastAPI
from huggingface_hub import InferenceClient

client = InferenceClient()

app = FastAPI()


def text_to_image(prompt):    
    return client.text_to_image(prompt)


with gr.Blocks(
    css=""".my-group {max-width: 600px !important; max-height: 600 !important;}
                      .my-column {display: flex !important; justify-content: center !important; align-items: center !important};"""
) as demo:
    with gr.Column(elem_classes=["my-column"]):
        gr.HTML(
            "<h1 style='text-align: center; margin-bottom: 1rem'>Diffusion Text-to-Image with logfire 🔍</h1>"
        )
        with gr.Group(elem_classes=["my-group"]):
            img = gr.Image(height=600, width=600, label="Generated Image")
            text = gr.Textbox(lines=1, placeholder="Enter your diffusion prompt...")
            text.submit(text_to_image, text, img)


app = gr.mount_gradio_app(app, demo, path="/")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=7860)
```

</Accordion>

I am attaching a gif of the UI generating an image below. It's amazing we have a fully working text-to-image app in 30 lines of code.

<Accordion title={'Gradio UI in action'}>

![Gradio Diffusion UI](/images/diffusion_logfire.gif)

</Accordion>

## Integrating Logfire

Logfire comes with with built-in integrations for FastAPI and Pydantic data models. Since Gradio is built on top of those libraries, integrating logfire is pretty easy. We only need to add five lines of code!

<Accordion title={'Logfire code'}>

```python
import logfire
from dotenv import load_dotenv

load_dotenv()

logfire.configure(pydantic_plugin=logfire.PydanticPlugin(record="all"))
logfire.instrument_fastapi(app)
```

</Accordion>

The `logfire.configure` call will set up Logfire to send info about created Pydantic models during the lifecycle of our app to our project on the Logfire platform. The `instrument_fastapi` function will record all the data sent to our server and collect performance metrics.

I am using [python-dotenv](https://pypi.org/project/python-dotenv/) to load my Logfire API key from a .env file. I recommend you do this so that you don't accidentally commit your token to version control. Otherwise, you have to use the `token` argument of `configure`.

Then we can add a Logfire span to our `text_to_image` function so we can record the generation time and the prompt for further analysis.


<Accordion title={'Adding a Logfire span'}>

```python
def text_to_image(prompt):
    # time the text to image operation
    start = time.monotonic()
    img = client.text_to_image(prompt)
    end = time.monotonic()
    with logfire.span("text_to_image", prompt=prompt, duration=end - start):
        return img
```

</Accordion>

It's also possible to decorate our function with [`logfire.instrument`](https://docs.pydantic.dev/logfire/guides/onboarding_checklist/add_manual_tracing/#using-the-logfireinstrument-decorator).


<Accordion title={'The full code'}>

```python
import gradio as gr
from fastapi import FastAPI
import logfire
from huggingface_hub import InferenceClient
import time
from dotenv import load_dotenv

load_dotenv()

client = InferenceClient()

app = FastAPI()
logfire.configure(pydantic_plugin=logfire.PydanticPlugin(record="all"))
logfire.instrument_fastapi(app)


def text_to_image(prompt):
    # time the text to image operation
    start = time.monotonic()
    img = client.text_to_image(prompt)
    end = time.monotonic()
    with logfire.span("text_to_image", prompt=prompt, duration=end - start):
        return img


with gr.Blocks(
    css=""".my-group {max-width: 600px !important; max-height: 600 !important;}
                      .my-column {display: flex !important; justify-content: center !important; align-items: center !important};"""
) as demo:
    with gr.Column(elem_classes=["my-column"]):
        gr.HTML(
            "<h1 style='text-align: center; margin-bottom: 1rem'>Diffusion Text-to-Image with logfire 🔍</h1>"
        )
        with gr.Group(elem_classes=["my-group"]):
            img = gr.Image(height=600, width=600, label="Generated Image")
            text = gr.Textbox(lines=1, placeholder="Enter your diffusion prompt...")
            text.submit(text_to_image, text, img)


app = gr.mount_gradio_app(app, demo, path="/")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=7860)
```
</Accordion>


## Analyzing our traces

After generating a couple of images, you can go back to the logfire platform to see the recorded data.
In the `Live` view, you will see all the recorded traces from our FastAPI app and our custom `text_to_image` span.

<Accordion title={'All recorded traces'}>

![All Traces](/images/logfire_all_traces.png)

</Accordion>

You can use the SQL filter bar at the top to filter by span name. In this case, I will look at our `text_to_image` span.

<Accordion title={'text_to_image span'}>

![All Traces](/images/logfire_text_to_image.png)

</Accordion>

In the `Explore` tab, we can use SQL to query all the durations recorded by Logfire. This could help us identify performance issues in our app.

<Accordion title={'Custom SQL'}>

![All Traces](/images/logfire_integration.gif)

</Accordion>

## Final Thoughts

All in all, I had a positive experience with Logfire. Adding Logfire to a gradio application is a breeze. It only required about 5 lines of extra code! And creating a new Logfire project is painless.
That being said, it's still in beta. I found a [bug](https://github.com/pydantic/logfire/issues/188) and I thought there weren't enough examples in the documentation for how to explore the data in Logfire.

I'm excited to see the project evolve. It could prove very helpful to Gradio developers!