<script>
  // import { Router, Route } from 'svelte-routing';
  import {Route} from 'tinro'; 
  import Home from './Home.svelte';
  import Rollback from './Rollback.svelte';
</script>

<!-- <Router>
  <Route path="/" component={Home} />
  <Route path="/rollback" component={Rollback} />
</Router> -->

<Route path="/"><Home /></Route>
<Route path="/rollback"><Rollback /></Route>