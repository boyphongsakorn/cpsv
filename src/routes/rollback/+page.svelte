<script>
	import { onMount } from 'svelte';
	// import { apiData, drinkNames } from "./store.js";
	import Avatar from 'svelte-avatar';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import js from 'jquery';
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
		Input
	} from 'sveltestrap';
	let isOpen = false;

	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}

	async function minecraftserverstatus() {
		const response = await fetch('https://api.mcsrvstat.us/2/playmc.pwisetthon.com');
		const movies = await response.json();
		return movies;
	}

    async function getusername(test) {
      //let ican = 'no'
      /*await fetch("http://localhost:3000/user/find/id/"+test)
          .then(response => response.json())
          .then(data => {
              //console.log(data);
              //console.log(data.user)
              return data.user;
              //ican = data.user
              //drinkNames.set(data);
          }).catch(error => {
              //console.log(error);
              //return 'ไม่รู้';
          });*/
      //return 'ไม่รู้';
      //return ican;
      const response = await fetch(
        "https://cpsql.pwisetthon.com/user/find/id/" + test
      );
      const movies = await response.json();
      return movies.user;
    }

    async function getblockname(test) {
      const response = await fetch(
        "https://cpsql.pwisetthon.com/blockname/find/id/" + test
      );
      const movies = await response.json();
      //remove minecraft: from the string and return the rest
      return movies.blockid.replace("minecraft:", "");
      //return movies.blockid;
    }

    function convertUnixTime(unix_timestamp) {
      var date = new Date(unix_timestamp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      //convert getMonth() to thai month
      var month = date.getMonth();
      var day = date.getDate();
      var year = date.getFullYear();
      var thaiMonth = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];
      var thaiDate = day + " " + thaiMonth[month] + " " + (year + 543);
      return thaiDate + " เวลา " + formattedTime;
    }

    let blockX = '';
    let blockY = '';
    let blockZ = '';

    async function getblockbycoordinate(x, y, z) {
      const response = await fetch("https://cpsql.pwisetthon.com/blog/find/xyz/" + x + "/" + y + "/" + z + "/" + x + "/" + y + "/" + z);
      const movies = await response.json();
      return movies;
    }

	let selectedBlock = '';
	let playerName = '';
	let confirmSelection = false;
	let isButtonDisabled = true;

	const isValidBlockSelector = () => {
		// TODO: implement validation logic for block selector (e.g., check if it's a valid block ID or X,Y,Z coordinates)
		return selectedBlock.trim() !== '';
	};

	const confirmSelectionHandler = (event) => {
		confirmSelection = event.target.checked;
		isButtonDisabled = !isValidBlockSelector() || !confirmSelection;
	};

	const selectBlockHandlerX = (event) => {
		selectedBlock = event.target.value;
        blockX = event.target.value;
        console.log(blockX);
		isButtonDisabled = !isValidBlockSelector() || !confirmSelection;
	};

    const selectBlockHandlerY = (event) => {
		selectedBlock = event.target.value;
        blockY = event.target.value;
        console.log(blockY);
		isButtonDisabled = !isValidBlockSelector() || !confirmSelection;
	};

    const selectBlockHandlerZ = (event) => {
		selectedBlock = event.target.value;
        blockZ = event.target.value;
        console.log(blockZ);
		isButtonDisabled = !isValidBlockSelector() || !confirmSelection;
	};


	const playerNameHandler = (event) => {
		playerName = event.target.value;
		isButtonDisabled = !isValidBlockSelector() || !confirmSelection || playerName.trim() === '';
	};

	const submitHandler = (event) => {
		// TODO: send rollback request to server with selectedBlock and playerName
		alert(`Rolling back block ${selectedBlock} for player ${playerName}`);
		event.preventDefault();
	};

	onMount(() => {
		isButtonDisabled = !isValidBlockSelector() || !confirmSelection || playerName.trim() === '';
	});
</script>

<Styles />

<Navbar color="dark" dark expand="md">
	<Container sm style="display: flex;">
		<NavbarBrand class="text-decoration-none text-white" href="/">PWMC Rollback</NavbarBrand>
		<NavbarToggler on:click={() => (isOpen = !isOpen)} />
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
			<Nav class="ms-auto" navbar>
				<NavItem>
					{#await minecraftserverstatus() then value}
						{#if value.online == true}
							<NavLink>Server Address : playmc.pwisetthon.com (ออนไลน์)</NavLink>
						{:else}
							<NavLink>Server Address : playmc.pwisetthon.com (ออฟไลน์)</NavLink>
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

<Container md>
	<div class="form-container">
		<h2 class="form-title">ย้อนกลับบล็อก</h2>
		<form on:submit={submitHandler}>
			<!-- <FormGroup>
                <Label for="block-selector">ใส่ X,Y,Z ของบล็อกที่ต้องการย้อนกลับ:</Label>
                <Input id="block-selector" type="text" placeholder="Enter X,Y,Z coordinates" on:input={selectBlockHandler} />
            </FormGroup> -->
			<Row>
				<Col>
					<Col>
						<FormGroup>
							<Label for="block-selector-x">ใส่ X ของบล็อกที่ต้องการย้อนกลับ:</Label>
							<Input
								id="block-selector-x"
								type="text"
								placeholder="Enter X coordinate"
								on:input={selectBlockHandlerX}
							/>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="block-selector-y">ใส่ Y ของบล็อกที่ต้องการย้อนกลับ:</Label>
							<Input
								id="block-selector-y"
								type="text"
								placeholder="Enter Y coordinate"
								on:input={selectBlockHandlerY}
							/>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="block-selector-z">ใส่ Z ของบล็อกที่ต้องการย้อนกลับ:</Label>
							<Input
								id="block-selector-z"
								type="text"
								placeholder="Enter Z coordinate"
								on:input={selectBlockHandlerZ}
							/>
						</FormGroup>
					</Col>
				</Col>
				<Col>
                    {#if blockX != '' && blockY != '' && blockZ != ''}
                        <Carousel>
                            {#await getblockbycoordinate(blockX, blockY, blockZ) then value}
                                {#each value as item, index}
                                    <CarouselItem bind:activeIndex itemIndex={index}>
                                        <Card class="mb-3">
                                            <CardHeader>
                                                {#await getusername(item.user) then values}
                                                    <CardTitle>
                                                        <Row>
                                                            <Col>ลำดับ {item.id}</Col>
                                                            <Col class="test d-inline-flex">
                                                                <!-- {#if value.indexOf('#') != -1}
                                                                    {#await getmonsterimage(value.replace('#', '')) then imgurl}
                                                                        <Avatar
                                                                            randomBgColor
                                                                            name={value.replace('#', '')}
                                                                            src={imgurl}
                                                                            size="50px"
                                                                        />
                                                                    {/await}
                                                                {:else} -->
                                                                    <Avatar
                                                                        randomBgColor
                                                                        name={value}
                                                                        src="https://cravatar.eu/avatar/{values}"
                                                                    />
                                                                <!-- {/if} -->
                                                                {#await getblockname(item.type) then value}
                                                                    <Avatar
                                                                        randomBgColor
                                                                        name={value}
                                                                        src="https://mc.nerothe.com/img/1.19.2/{value}.png"
                                                                    />
                                                                {/await}
                                                            </Col>
                                                        </Row>
                                                    </CardTitle>
                                                {/await}
                                            </CardHeader>
                                            <CardBody>
                                                <!--CardSubtitle>Card subtitle</CardSubtitle-->
                                                <CardText>
                                                    <ul>
                                                        <!--
                                                        {#await getusername(drinkName.user) then value}
                                                        <li>ผู้เล่น {value}</li>
                                                        {/await}
                                                        -->
                                                        <!--li>ไอดี {getusername(drinkName.user).then((value) => {return value})}</li-->
                                                        <li>วันที่ {convertUnixTime(item.time)}</li>
                                                        <li>ตำแหน่ง {item.x} {item.y} {item.z}</li>
                                                        {#await getblockname(item.type) then value}
                                                            <li>บล็อก {value}</li>
                                                        {/await}
                                                        <li>
                                                            {#if item.action == 0}
                                                                ทุบบล็อก
                                                            {:else if item.action == 1}
                                                                วางบล็อก
                                                            {:else if item.action == 2}
                                                                คลิก/ใช้งาน
                                                            {:else}
                                                                อื่นๆ
                                                            {/if}
                                                        </li>
                                                    </ul>
                                                </CardText>
                                                <!--Button>Button</Button-->
                                            </CardBody>
                                            <CardFooter>
                                                <a href="">
                                                    <Button outline color="primary" style="margin-right: 5px;">
                                                        Rollback / ย้อนบล็อกกับคืนมา
                                                    </Button>
                                                </a>
                                            </CardFooter>
                                        </Card>
                                    </CarouselItem>
                                {/each}
                            {/await}
                        </Carousel>
                    {/if}
				</Col>
			</Row>

			<FormGroup class="input-group">
				<Label for="player-name">ใส่ชื่อผู้เล่น/ชื่อในเกม:</Label>
				<Input
					id="player-name"
					type="text"
					placeholder="Your player name"
					on:input={playerNameHandler}
				/>
			</FormGroup>

			<FormGroup class="input-group">
				<Input id="confirm-block" type="checkbox" on:change={confirmSelectionHandler} />
				<Label for="confirm-block">I confirm that this is the block I want to rollback.</Label>
			</FormGroup>

			<Button type="submit" color="primary" disabled={isButtonDisabled}>Rollback Block</Button>
		</form>
	</div>
</Container>
