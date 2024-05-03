---
title: "Memory Trouble"
date: "2021-06-16"
updated: "2021-06-16"
categories:
  - "machine learning"
  - "python"
excerpt: A case study of how to debug memory problems in python using open source tools.
---

Finding out that an application is running out of memory is one of the worst realizations a developer can have. Memory problems are hard to diagnose and fix in general, but I’d argue it’s even harder in Python. Python’s automatic garbage collection makes it easy to get up and going with the language, but it’s so good at being out of the way that when it doesn’t work as expected, developers can be at a loss for how to identify and fix the problem.

I will show how we diagnosed and fixed a memory problem in EvalML, the open-source AutoML library developed by Alteryx Innovation Labs. There is no magic recipe for solving memory problems, but my hope is that developers, specifically Python developers, can learn about tools and best practices they can leverage when they run into this kind of problem in the future.

Check out the full post at the [Alteryx Innovation Labs](https://innovation.alteryx.com/how-to-troubleshoot-memory-problems-in-python/). It was covered on the [Real Python Podcast](https://realpython.com/podcasts/rpp/68/#t=2368)!