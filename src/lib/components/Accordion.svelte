<script>
    export let open = false;
    export let title = 'Code Block Title';
    
    function toggleExpanded() {
      open = !open;
    }
  </script>
  
  <div class="code-block">
    <div class="title-bar text-white text-lg" on:click={toggleExpanded}>
      <span>{title}</span>
      <span class="arrow">{open ? '▼' : '▶'}</span>
    </div>
    {#if open}
        <div class="pb-0">
            <slot />
        </div>
    {/if}
  </div>
  
  <style>
    .code-block {
      background-color: #282a36;
    }
  
    .title-bar {
      background-color: #282a36;  
      padding: 5px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
    }
  
    .arrow {
      font-size: 0.8em;
    }

</style>