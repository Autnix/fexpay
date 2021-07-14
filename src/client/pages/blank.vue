<template>
  <div class="page">
    <div class="card mb-inline">
      <button class="button">Button</button>
      <button class="button b-bold">Button Bold</button>
      <button class="button b-block">Button Block</button>
      <button class="button b-danger">Button Danger</button>
      <button class="button b-warning">Button Warning</button>
      <button class="button b-secondary">Button Secondary</button>
      <button class="button" disabled>Button Disable</button>
    </div>

    <div class="card mb-inline">
      <form class="form">
        <input
          type="text"
          class="f-control"
          placeholder="text"
          pattern="[a-z]"
          required
        />

        <input
          type="email"
          class="f-control"
          placeholder="email"
          name=""
          id=""
        />

        <textarea
          cols="30"
          class="f-control"
          rows="10"
          placeholder="Textarea"
        ></textarea>

        <select class="f-control">
          <option>selector 1</option>
          <option>selector 2</option>
          <option>selector 3</option>
        </select>

        <div class="f-group">
          <label for="a">Text With Label</label>
          <input
            type="text"
            class="f-control"
            id="a"
            placeholder="text input"
          />
        </div>

        <div class="i-group">
          <input type="text" class="f-control" placeholder="Input with icon" />
          <div class="group-icon">
            <span>
              <uil-envelope height="25px" />
            </span>
          </div>
          <div class="group-icon position-right">
            <span> @gmail.com </span>
          </div>
        </div>

        <div class="i-group i-collapse">
          <input
            type="text"
            class="f-control"
            placeholder="Input with icon collapse"
          />
          <div class="group-icon">
            <span>
              <uil-envelope height="25px" />
            </span>
          </div>
        </div>

        <div class="i-group i-collapse">
          <input type="text" class="f-control" placeholder="Input with group" />
          <div class="group-icon">
            <span> ₺ </span>
          </div>
        </div>

        <label class="f-checkbox" for="b">
          <input type="checkbox" id="b" /> Checkbox with input
        </label>
      </form>
    </div>
    <input type="text" class="f-control" placeholder="text" />
  </div>
</template>

<script>
import { UilEnvelope } from "@iconscout/vue-unicons";

export default {
  components: {
    UilEnvelope,
  },
};
</script>