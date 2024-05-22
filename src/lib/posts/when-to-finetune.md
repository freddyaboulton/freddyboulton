---
title: "Reasons to Fine Tune an LLM 🦜"
date: "2024-05-21"
updated: "2024-05-21"
categories:
  - "LLM"
  - "AI"
coverImage: "/images/fine_tune_cover.jpeg"
showCoverImage: false
excerpt: Is fine tuning dead in the age of the LLM? Outlining the cases where fine tuning is worth the effort.
---

<script> 
import Accordion from '$lib/components/Accordion.svelte'; 
</script>

I am attending the Mastering LLMs online [conference](https://maven.com/parlance-labs/fine-tuning) hosted by [Hamel Husain](https://hamel.dev/) and [Dan Becker](https://x.com/dan_s_becker?lang=en).

One of the topics covered was whether fine tuning was worth it given the ever-increasing strength of large base models like Llama 70b, Mixtral, ChatGPT, Claude, etc. Surely these mega models are already good at whatever you are trying to do, right?

Below are some cases where I think fine tuning is worth the effort.

### 1. Prompt engineering is not cutting it

You should always start with prompt engineering instead of fine tuning since it's the quickest path to a minimum viable product. 
But if, after several iterations of prompt engineering, the base model is not able to generate adequate responses, then fine tuning may push you past that plateau. 

This point underscores the importance of setting up a good evaluation suite for your project. That's how you can objectively measure the quality of the responses. 

### 2. Prompt engineering is impractical

For some problems, it is impractical to encode all of the context a model may need to correctly respond to the query in the prompt. For example, asking an LLM to generate code for a proprietary programming language. In this case, the entire "spec" of the language would have to be included in the prompt, which is either impossible or very costly as it takes up a large part of the context limit.

### 3. Your data gives you an edge

In order for a fine tuned model to outperform a general model on a specific task, it must be trained on data better than what the foundation model was trained on.

If you have a well-defined task and a lot of high quality data that a foundation model hasn't seen, then fine tuning will probably yield a better performing model.

### 4. Latency and Cost

Fine tuning can make a small model better than a large foundation model at a given task. Fine tuning will also likely mean you can get away with shorter prompts. In the end, this will mean cheaper hosting and faster inference times.


### Case Studies

Here are some example problems and whether or not fine tuning or prompt engineering is better suited for them.

* **Answering questions about how to use a software library**. In general, fine tuning would work best unless the library is very very popular and so the foundation models are already understand them quite well.
* **An app that generates a workout based on a few criteria like the length and equipment available**. I think prompt-engineering will suffice here because workouts are very subjective and there are many acceptable answers. I don't know what data I could collect that could improve the answer given by GPT-4/Claude. Perhaps if the workout had to meet very specific criteria, then fine tuning would be warranted.
* **An App that integrates into a clothing store's inventory and suggests outfits based on a "vibe"**. I think fine tuning would work best here. Obviously, I think there will be a RAG component to this where the most relevant items in the inventory are injected into the prompt but I think there is a lot of nuance that goes into deciding how items go together into an outfit that foundation models would not natively understand. Also, fine tuning could enable the store to brand the app as capturing the style of a famous/well-known fashion designer.