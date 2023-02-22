<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './Home.svelte';
  import Rollback from './Rollback.svelte';
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="/rollback" component={Rollback} />
</Router>