---
title: "Building A Custom Gradio Slider"
date: "2024-05-06"
updated: "2024-05-06"
categories:
  - "gradio"
  - "web development"
  - "custom components"
coverImage: "/images/range_slider_component.gif"
coverWidth: 16
coverHeight: 9
excerpt: Learn about Gradio's custom components by building a slider 🛝
---

<script> 
import Accordion from '$lib/components/Accordion.svelte'; 
</script>


## Building a Range Slider 🛝

I really like Gradio's custom components. If Gradio's core components do not perfectly fit your use case, you can unblock yourself by implementing  a component of your own!

The most recent example of this was when the open eval team at HuggingFace wanted to be able to filter models in the [Open LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard) by model size. They wanted users to be able to set the lower and upper bounds of the model size and only show models in that range. 

In this post, I will show you how I implemented a custom slider component called `RangeSlider` for this use case. 


### Scaffolding the project

Starting a custom component is easy with the Gradio custom component command-line-interface (CLI).
I used the `create` command and the `--template` option to create a new custom component from the current `Slider` component in Gradio.

I highly recommend you run the `create` command in a [virtual environment](https://docs.python.org/3/library/venv.html) or conda environment.

<Accordion open={false} title={"Gradio CLI Commands"}>

```bash
mkdir rangeslider
cd rangeslider
python3 -m venv .venv
source .venv/bin/activate
pip install gradio
gradio cc create RangeSlider --template Slider
```

</Accordion>


The `create` command will create a new directory with the following contents:

- `backend` directory. This is where the python interface of your custom component lives.
- `frontend` directory. This is where the visual user interface (UI) is defined.
- `demo` directory. A demo you can use to showcase your component on [Hugging Face Spaces](https://huggingface.co/spaces).
- `pyproject.toml` file. This is used to build the directory into a python wheel others can install from [PyPi](https://pypi.org/).
- `README` file. This is the landing page of your component on PyPi as well as the configuration of the space on Hugging Face.


### The Backend

I like to start by developing the python logic of the custom component.
So the first thing I did was define a `data_model`.
The `data_model` is the data format the frontend and backend will use to communicate.
I want the data to be sent back and forth as a tuple of two floats, so I implemented a 
`RangeSliderData` class and set it to the `data_model` attribute of the `RangeSlider` class.

Gradio leverages [Pydantic](https://docs.pydantic.dev/latest/) to define data models so the `RangeSliderData` class behaves similarly to a pydantic [Root Model](https://docs.pydantic.dev/latest/concepts/models/#rootmodel-and-custom-root-types).

<Accordion open={false} title={"The Data Model"}>

```python
# In backend/gradio_rangeslider/rangeslider.py

from gradio.data_classes import GradioRootModel

class RangeSliderData(GradioRootModel):
    root: Tuple[float, float]


class RangeSlider(FormComponent):
    """
    A slider component that allows the user to select a range of values.
    """

    EVENTS = [Events.change, Events.input]
    data_model = RangeSliderData
```

</Accordion>

I left the `__init__` method of the class unchanged (except changing the type hint of the `value` parameter to be a tuple). Now it's time to update the component methods to handle the new `data_model` class we defined.


For the `example_playload` and `example_value` methods, I will return the maximum possible range. 

The `postprocess` method will package the tuple the user returns from their function into a `RangeSliderData` instance.

The `preprocess` will take the `RangeSliderData` instance from the frontend and serialize it into a tuple. 

Each of these methods can be defined in one line!

<Accordion open={false} title={"The Updated Component Methods"}>

```python
def example_payload(self) -> Any:
    return [self.minimum, self.maximum]

def example_value(self) -> Any:
    return [self.minimum, self.maximum]

def postprocess(self, value: Tuple[float, float] | None) -> RangeSliderData:
    """
    Parameters:
        value: Expects a tuple of  {int} or {float} returned from function and sets slider value to it.
    Returns:
        The selected range.
    """
    return [self.minimum, self.maximum] if value is None else RangeSliderData(root=value)

def preprocess(self, payload: RangeSliderData) -> Tuple[float, float]:
    """
    Parameters:
        payload: slider value
    Returns:
        Passes slider value as a {float} into the function.
    """
    return payload.model_dump()
```
</Accordion>

### The frontend

I'm more comfortable in python than svelte, html, or css so in my experience, defining the frontend of a custom component is trickier than the backend.

But I don't let that dissuade me! I simply ask Llama 3 70b on [Hugging Chat](https://huggingface.co/chat/) for help 🙈 All jokes aside, LLMs are really good at svelte, html, and css so asking for a generic svelte component that does what you want and then adding the Gradio logic afterwards works quite well. It's what I did in this example!

I like to think of Svelte components as broken up into three separate parts:

- The UI defined in plain HTML and other svelte components
- The `<script>` section is where all the reactivity is defined.
- The `<style>` section is where CSS is defined.

I'm going to tackle each section separately.

### The UI

At the top level, I place the component inside a `<Block>` component, which handles the visibility, loading status, and other common properties. This code was already present in the `Slider` template so I did not modify it.

Below the `<div class="wrap">`, I place two numeric input components to display the current value of the left and right bounds of the range. The `range-slider` div implements the actual range slider. It consists of a background `<div class="range-bg">`, a `<div class="range-line">` that represents the selected range, and two `<input type="range">` elements for the minimum and maximum values. 

The `bind:value` directive binds the input values to the `selected_min` and `selected_max` variables, and the `on:input` directive calls the respective change handlers when the user interacts with the slider.

<Accordion open={false} title={"The UI"}>

```svelte
<Block {visible} {elem_id} {elem_classes} {container} {scale} {min_width}>
	<StatusTracker
		autoscroll={gradio.autoscroll}
		i18n={gradio.i18n}
		{...loading_status}
		on:clear_status={() => gradio.dispatch("clear_status", loading_status)}
	/>

    <div class="wrap">
		<div class="head">
			<BlockTitle {show_label} {info}>{label}</BlockTitle>
			<div class="numbers">
			  <input
				  aria-label={`max input for ${label}`}
				  data-testid="max-input"
				  type="number"
				  bind:value={selected_max}
				  min={minimum}
				  max={maximum}
				  disabled={!interactive}
			  />
			  <input
				aria-label={`min input for ${label}`}
				data-testid="min-input"
				type="number"
				bind:value={selected_min}
				min={minimum}
				max={maximum}
				disabled={!interactive}
			  />
			</div>
		</div>
	  </div>
	  <div class="range-slider">
		<div class="range-bg"></div>
		<div class="range-line" style={rangeLine}></div>
		<input type="range" disabled={!interactive} min={minimum} max={maximum} {step} bind:value={selected_min} on:input={handle_min_change} />
		<input type="range" disabled={!interactive} min={minimum} max={maximum} {step} bind:value={selected_max} on:input={handle_max_change} />
	  </div>
</Block>
```
</Accordion>


### The Script Section

This script section handles the interaction between the range slider and the component's value. 

The `handle_change` function dispatches the change and input events with the selected minimum and maximum values. The `handle_min_change` and `handle_max_change` functions ensure that the minimum value never exceeds the maximum value and vice versa.


The script also updates the `selected_min` and `selected_max` values whenever the value property changes. Finally, it calculates the position and width of the range line based on the selected values and the minimum and maximum values of the range.


<Accordion open={false} title={"The script section"}>

```js
function handle_change(selected_min, selected_max): void {
    value = [selected_min, selected_max];
    gradio.dispatch("change", [selected_min, selected_max]);
    if (!value_is_output) {
    gradio.dispatch("input", [selected_min, selected_max])
    }
}

function handle_min_change(event) {
    selected_min = parseInt(event.target.value);
    if (selected_min > selected_max) {
    selected_max = selected_min;
    }
}

function handle_max_change(event) {
    selected_max = parseInt(event.target.value);
    if (selected_max < selected_min) {
    selected_min = selected_max;
    }
}

let old_value = value;
let [selected_min, selected_max] = value;

$: if (JSON.stringify(old_value) !== JSON.stringify(value)) {
    [selected_min, selected_max] = value;
    old_value = value;
}

$: handle_change(selected_min, selected_max);

$: rangeLine = `
    left: ${( (selected_min - minimum) / (maximum - minimum)) * 100}%;
    width: ${ ((selected_max - selected_min) / (maximum - minimum)) * 100}%;
`;
```
</Accordion>


### CSS

I left most of the css unchanged but I styled the classes I created.

The `.numbers` class styles the input fields for the minimum and maximum values and makes sure they are displayed in a flex row.

The `.range-slider` class positions the range slider and its elements. The input[type="range"] selector styles the slider track and thumb.  It's important to use the `webkit` and `moz` media queries so that the slider looks good in both Chrome and Firefox. 

The `.range-line` class represents the selected range. I use the `--slider-color` CSS variable defined in gradio so that the color matches the standard Gradio theme and any custom themes defined by the user. The `.range-bg` class provides the background "greyed-out" track for the unselected area.

<Accordion open={false} title={"The CSS"}>

```svelte
<style>
    .head {
      display: flex;
      justify-content: space-between;
    }

    .numbers {
	  display: flex;
      flex-direction: row-reverse;
      max-width: var(--size-6);
	}

    input[type="number"] {
        display: block;
        position: relative;
        outline: none !important;
        box-shadow: var(--input-shadow);
        border: var(--input-border-width) solid var(--input-border-color);
        border-radius: var(--input-radius);
        background: var(--input-background-fill);
        padding: var(--size-2) var(--size-2);
        height: var(--size-6);
        color: var(--body-text-color);
        font-size: var(--input-text-size);
        line-height: var(--line-sm);
        text-align: center;
	}

    .range-slider {
      position: relative;
      width: 100%;
      height: 30px;
    }
  
    .range-slider input[type="range"] {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      appearance: none;
      outline: none;
      background: transparent;
      pointer-events: none;
    }
  
    .range-slider input[type="range"]::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      border: solid 0.5px #ddd;
      pointer-events: auto;
      cursor: pointer;
    }
  
    .range-slider input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      border: solid 0.5px #ddd;
      pointer-events: auto;
      cursor: pointer;
    }
  
    .range-line {
      position: absolute;
      left: 0;
      bottom: 8px;
      height: 4px;
      background: var(--slider-color);
      pointer-events: none;
    }

    .range-bg {
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 8px;
      height: 4px;
      z-index: 0;
      background: var(--neutral-200);
      pointer-events: none;
    }

```
</Accordion>


### Conclusion

We have successfully built a custom range slider component in Gradio. By now you should know how to:

- Scaffold a new custom component using the Gradio CLI
- Define the data model and methods for your component
- Handle user interactions with JavaScript
- Structure your component's HTML
- Style your component with CSS

You can now apply these concepts to create your own custom Gradio components.


**Further Reading:**
- `Range Slider` [demo](https://huggingface.co/spaces/freddyaboulton/gradio_rangeslider)
- `Range Slider` [code](https://github.com/freddyaboulton/gradio-range-slider)
- Custom Components [Guide](https://www.gradio.app/guides/custom-components-in-five-minutes)


