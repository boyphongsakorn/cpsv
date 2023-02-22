<script>
    import { onMount } from "svelte";
    import { apiData, drinkNames } from "./store.js";
    import Avatar from "svelte-avatar";
    import { paginate, LightPaginationNav } from "svelte-paginate";
    import js from "jquery";
    import {
      Collapse,
      Navbar,
      NavbarToggler,
      NavbarBrand,
      Nav,
      NavItem,
      NavLink,
      Dropdown,
      DropdownToggle,
      DropdownMenu,
      DropdownItem,
      Col,
      Container,
      Row,
      Button,
      Card,
      CardBody,
      CardFooter,
      CardHeader,
      CardSubtitle,
      CardText,
      CardTitle,
      Tooltip,
      Pagination,
      PaginationItem,
      PaginationLink,
      Carousel,
      CarouselControl,
      CarouselItem,
      Styles,
      FormGroup,
      Label,
      Input,
    } from "sveltestrap";

    let isOpen = false;
  
    function handleUpdate(event) {
      isOpen = event.detail.isOpen;
    }
  
    async function minecraftserverstatus() {
      const response = await fetch(
        "https://api.mcsrvstat.us/2/playmc.pwisetthon.com"
      );
      const movies = await response.json();
      return movies;
    }
</script>

<Styles />

<Navbar color="dark" dark expand="md">
    <Container sm style="display: flex;">
      <NavbarBrand href="/">PWisetthon.com Svelte Beta</NavbarBrand>
      <NavbarToggler on:click={() => (isOpen = !isOpen)} />
      <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
        <Nav class="ms-auto" navbar>
          <NavItem>
            {#await minecraftserverstatus() then value}
              {#if value.online == true}
                <NavLink>Server Address : playmc.pwisetthon.com (ออนไลน์)</NavLink
                >
              {:else}
                <NavLink>Server Address : playmc.pwisetthon.com (ออฟไลน์)</NavLink
                >
              {/if}
            {/await}
          </NavItem>
          <!--NavItem>
              <NavLink href="#components/">Components</NavLink>
              </NavItem>
              <NavItem>
              <NavLink href="https://github.com/bestguy/sveltestrap">GitHub</NavLink>
              </NavItem>
              <Dropdown nav inNavbar>
              <DropdownToggle nav caret>Options</DropdownToggle>
              <DropdownMenu end>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
              </Dropdown-->
        </Nav>
      </Collapse>
    </Container>
  </Navbar>

  <div class="form-container">
    <h2 class="form-title">Rollback Block</h2>
    <form on:submit={submitHandler}>
      <FormGroup class="input-group">
        <Label for="block-selector">Select a block to rollback:</Label>
        <Input id="block-selector" type="text" placeholder="Enter block ID or X,Y,Z coordinates" on:input={selectBlockHandler} />
      </FormGroup>
  
      <FormGroup class="input-group">
        <Label for="player-name">Enter your player name:</Label>
        <Input id="player-name" type="text" placeholder="Your player name" on:input={playerNameHandler} />
      </FormGroup>
  
      <FormGroup class="input-group">
        <Input id="confirm-block" type="checkbox" on:change={confirmSelectionHandler} />
        <Label for="confirm-block">I confirm that this is the block I want to rollback.</Label>
      </FormGroup>
  
      <Button type="submit" color="primary" disabled={isButtonDisabled}>Rollback Block</Button>
    </form>
  </div>