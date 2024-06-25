---
title: "Blazing Fast Local Chatbots with Llama.cpp and Gradio 🦙⚡️"
date: "2024-06-25"
updated: "2024-06-25"
categories:
  - "gradio"
  - "llms"
  - "chatbot"
coverWidth: 16
coverHeight: 9
coverImage: /images/gradio_llamacpp.png
showCoverImage: false
excerpt: Get a chatbot UI running locally in 5 minutes with Gradio and Llama.cpp
---

<script> 
import Accordion from '$lib/components/Accordion.svelte'; 
</script>

<svelte:head>
    <script
        type="module"
        src="https://gradio.s3-us-west-2.amazonaws.com/4.36.1/gradio.js"
    ></script>
</svelte:head>

In this post, we'll run a state of the art LLM on your laptop and create a webpage you can use to interact with it. All in about 5 minutes. Seriously!

We'll be using Llama.cpp's [python bindings](https://github.com/abetlen/llama-cpp-python) to run the LLM on our machine and [Gradio](https://github.com/gradio-app/gradio) to build the webpage.

If you are not familar with Llama.cpp, it is an open-source C++ library that enables efficient inference of large language models (particularly the LLaMA family) on consumer hardware through aggressive quantization, optimized tensor operations, and careful memory management.

Gradio is an open source python library for building performant AI web applications.

Enough talk, let's code!

## Installation

Both Gradio and Llama.cpp's python bindings can be installed with pip.

<Accordion title={"Installation Instructions"}>

```bash
pip install gradio llama-cpp-python \
    --extra-index-url https://abetlen.github.io/llama-cpp-python/whl/cpu
```
</Accordion>


This will install LLama.cpp with only CPU support. If you have a GPU with CUDA 12.1 installed, you can enable GPU support by replacing the `--extra-index-url` with `https://abetlen.github.io/llama-cpp-python/whl/cu121`. There are many supported backends for Llama.cpp, so I recommend you consult the github [page](https://github.com/abetlen/llama-cpp-python?tab=readme-ov-file#supported-backends) to find the best version for your machine.


## Downloading The Model

Llama.cpp runs models stored in a special file type called GGUF binary format. You can find LLMs that are stored in GGUF files from the [huggingface hub](https://huggingface.co/models?library=gguf&sort=trending) but for this demo we'll be using the [QWEN-2 0.5B instruct model](https://huggingface.co/Qwen/Qwen2-0.5B-Instruct-GGUF) since it is relatively small but performant.

You can download the gguf model with the huggingface cli (it comes installed with Gradio)

<Accordion title={"Model Download"}>

```bash
huggingface-cli download Qwen/Qwen2-0.5B-Instruct-GGUF \
    qwen2-0_5b-instruct-q5_k_m.gguf \
    --local-dir . --local-dir-use-symlinks False
```
</Accordion>

In this command, we're specifically downloading the `qwen2-0_5b-instruct-q5_k_m.gguf` file but you'll notice that there are many files available in the model repository. Each one corresponds to a different quantization strategy used to compress the original model into the GGUF format. You can consult this [table](https://github.com/ggerganov/llama.cpp/discussions/2094#discussioncomment-6351796) for an explanation of the different formats.


## Creating the Chatbot Web App

We're nearly done. Let's create an `app.py` file and import `gradio` as well as the `Llama` class from llama.cpp:

<Accordion title={"Imports"}>

```python
import gradio as gr
from llama_cpp import Llama

llm = Llama(
    model_path="./qwen2-0_5b-instruct-q5_k_m.gguf",
    verbose=True
)
```

</Accordion>

Now we need to implement our gradio prediction function. At a high level, it will take the chat history from the web application, convert it into a format that Llama.cpp expects and then pass that to the `chat_completion` API. We'll then yield each new token to stream the response back to the web app. 

I'm skipping the low level details here, I recommend you read llama.cpp's [documentation](https://github.com/abetlen/llama-cpp-python?tab=readme-ov-file#chat-completion) as well as Gradio's [chatbot guide](https://www.gradio.app/guides/creating-a-chatbot-fast).

<Accordion title={"Gradio UI"}>

```python
def predict(message, history):
    messages = [{"role": "system", "content": "You are a helpful assistant."}]
    for user_message, bot_message in history:
        if user_message:
            messages.append({"role": "user", "content": user_message})
        if bot_message:
            messages.append({"role": "assistant", "content": bot_message})
    messages.append({"role": "user", "content": message})
    
    response = ""
    for chunk in llm.create_chat_completion(
        stream=True,
        messages=messages,
    ):
        part = chunk["choices"][0]["delta"].get("content", None)
        if part:
            response += part
        yield response

demo = gr.ChatInterface(predict)

demo.launch()
```

</Accordion>

## Conclusion

Believe it or not, that's it! 

You can play with our chatbot below and see all the source code (as well as the demo) in this Hugging Face [space](https://huggingface.co/spaces/freddyaboulton/gradio-llamma-cpp).


<gradio-app src="https://freddyaboulton-gradio-llamma-cpp.hf.space"></gradio-app>



