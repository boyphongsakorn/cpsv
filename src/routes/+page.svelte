<script>
    import { onMount } from "svelte";
    import { page } from '$app/stores';
    // import { apiData, drinkNames } from "./store.js";
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

    // export let location;
  
    //const urlParams = new URLSearchParams(location);
    const isId = $page.url.searchParams.has("id");
    const isX = $page.url.searchParams.has("x");
    const isY = $page.url.searchParams.has("y");
    const isZ = $page.url.searchParams.has("z");
    const isOffset = $page.url.searchParams.has("offset");
    let id = "";
  
    let items = [];
    let indexpage = 1;
    let totalItemsvalue = 0;
    onMount(async () => {
      window.js = js;
      let url = "https://cpsql.pwisetthon.com/blog/find/page/1";
      if (isId) {
        id = $page.url.searchParams.get("id");
        url = "https://cpsql.pwisetthon.com/blog/find/user/" + id + "/1";
      } else if (isX && isY && isZ) {
        let x = $page.url.searchParams.get("x");
        let y = $page.url.searchParams.get("y");
        let z = $page.url.searchParams.get("z");
        let offset = 0;
        if (isOffset) {
          offset = $page.url.searchParams.get("offset");
        }
        let xplus = parseInt(x) + parseInt(offset);
        let yplus = parseInt(y) + parseInt(offset);
        let zplus = parseInt(z) + parseInt(offset);
        url = "https://cpsql.pwisetthon.com/blog/find/xyz/" + x + "/" + y + "/" + z + "/" + xplus + "/" + yplus + "/" + zplus + "/1";
      }
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          //apiData.set(data);
          items = data;
          allcount();
        })
        .catch((error) => {
          //console.log(error);
          return [];
        });
    });
    //let name = 'world';
  
    //let items
    async function wow(i) {
      if (i == undefined) {
        i = 1;
      }
      let url = "https://cpsql.pwisetthon.com/blog/find/page/" + i;
      if ($page.url.searchParams.has("id")) {
        id = $page.url.searchParams.get("id");
        url = "https://cpsql.pwisetthon.com/blog/find/user/" + id + "/" + i;
      } else if (isX && isY && isZ) {
        let x = $page.url.searchParams.get("x");
        let y = $page.url.searchParams.get("y");
        let z = $page.url.searchParams.get("z");
        let offset = 0;
        if (isOffset) {
          offset = $page.url.searchParams.get("offset");
        }
        let xplus = parseInt(x) + parseInt(offset);
        let yplus = parseInt(y) + parseInt(offset);
        let zplus = parseInt(z) + parseInt(offset);
        url = "https://cpsql.pwisetthon.com/blog/find/xyz/" + x + "/" + y + "/" + z + "/" + xplus + "/" + yplus + "/" + zplus + "/" + i;
      }
      const response = await fetch(url);
      const movies = await response.json();
      //items=movies;
      items = movies;
      indexpage = i;
      return movies;
    }

    async function playerchange(i) {
      let url = "";
      // let urlcount = "";
      if (i) {
        id = i
        url = "https://cpsql.pwisetthon.com/blog/find/user/" + i + "/1";
        // url = "https://cpsql.pwisetthon.com/blog/find/all/count/" + id;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            //console.log(data);
            //apiData.set(data);
            items = data;
            allcount();
          })
          .catch((error) => {
            //console.log(error);
            return [];
          });
      }
    }
  
    async function wowplayer(userid) {
      const response = await fetch(
        "https://cpsql.pwisetthon.com/blog/find/user/" + userid
      );
      const movies = await response.json();
      items = movies;
      return true;
      //return movies;
    }
  
    function wowblock() {
      //get value from id x, y, z and plus
      let x = document.getElementById("x").value;
      let y = document.getElementById("y").value;
      let z = document.getElementById("z").value;
      let offset = document.getElementById("plus").value;
      //change location to https://mccplog.pwisetthon.com/?x=0&y=0&z=0&offset=0
      window.location.href ="https://mccplog.pwisetthon.com/?x=" + x + "&y=" + y + "&z=" + z + "&offset=" + offset;
    }
  
    async function allcount() {
      let url = "https://cpsql.pwisetthon.com/blog/find/all/count";
      if ($page.url.searchParams.has("id")) {
        id = $page.url.searchParams.get("id");
        url = "https://cpsql.pwisetthon.com/blog/find/all/count/" + id;
      } else if (isX && isY && isZ) {
        let x = $page.url.searchParams.get("x");
        let y = $page.url.searchParams.get("y");
        let z = $page.url.searchParams.get("z");
        let offset = 0;
        if (isOffset) {
          offset = $page.url.searchParams.get("offset");
        }
        let xplus = parseInt(x) + parseInt(offset);
        let yplus = parseInt(y) + parseInt(offset);
        let zplus = parseInt(z) + parseInt(offset);
        url = "https://cpsql.pwisetthon.com/blog/find/count/xyz/" + x + "/" + y + "/" + z + "/" + xplus + "/" + yplus + "/" + zplus;
      }
      const response = await fetch(url);
      const movies = await response.json();
      let itemcount = movies / 40;
      let wow = [];
      for (let i = 0; i < itemcount; i++) {
        wow.push(i + 1);
      }
      //return wow;
      //return parseInt(movies);
      totalItemsvalue = parseInt(movies);
      indexpage = 1;
    }
  
    function test(wow) {
      console.log(wow);
    }
  
    /*const items = async function() {
          const response = await fetch('http://localhost:3000/blog/find/all');
            const movies = await response.json();
            return movies;
      }*/
  
    /*let currentPage = 1
        let pageSize = 40
      $: paginatedItems = paginate({ items, pageSize, currentPage })*/
  
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
  
    async function getallusername() {
      // const response = await fetch("https://cpsql.pwisetthon.com/user/find/all");
      const response = await fetch("https://cpsql.pwisetthon.com/user/find/withouthashtag");
      const movies = await response.json();
      return movies;
    }
  
    async function getallusernamecarousel() {
      const response = await fetch("https://cpsql.pwisetthon.com/user/find/withouthashtag");
      const movies = await response.json();
      let list = [];
      let fiveten = [];
      let count = 0;
      for (let i = 0; i < movies.length; i++) {
        const getcount = await fetch(
          "https://cpsql.pwisetthon.com/blog/find/all/count/" + movies[i].userid
        );
        const getcountdata = await getcount.text();
        //if (parseInt(getcountdata) > 0) {
          fiveten.push(movies[i]);
          count++;
        //}
        //fiveten.push(movies[i]);
        //if((i+1)%12 == 0) {
        if (count % 12 == 0) {
          list.push(fiveten);
          fiveten = [];
        } else if (i == movies.length - 1) {
          list.push(fiveten);
        }
      }
      return list;
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
  
    async function getmonsterimage(test) {
      let urls =
        "https://minecraftfaces.com/wp-content/bigfaces/big-" +
        test +
        "-face.jpg";
      const response = await fetch("https://anywhere.pwisetthon.com/" + urls);
      //const movies = await response.json();
      //if response is 404 then return png url
      if (response.status == 404) {
        urls =
          "https://minecraftfaces.com/wp-content/bigfaces/big-" +
          test +
          "-face.png";
      }
      const response2 = await fetch("https://anywhere.pwisetthon.com/" + urls);
      if (response2.status == 404) {
        urls = "https://minecraftitemids.com/item/64/" + test + ".png";
      }
      const response3 = await fetch("https://anywhere.pwisetthon.com/" + urls);
      if (response3.status == 404) {
        urls = "https://mc.nerothe.com/img/1.19.2/" + test + ".png";
      }
      const lastchange = await fetch("https://anywhere.pwisetthon.com/" + urls);
      if (lastchange.status == 404) {
        //change _ to -
        test = test.replace(/_/g, "-");
        urls =
          "https://minecraftfaces.com/wp-content/bigfaces/big-" +
          test +
          "-face.jpg";
        const response4 = await fetch("https://anywhere.pwisetthon.com/" + urls);
        //const movies = await response.json();
        //if response is 404 then return png url
        if (response4.status == 404) {
          urls =
            "https://minecraftfaces.com/wp-content/bigfaces/big-" +
            test +
            "-face.png";
        }
        const response5 = await fetch("https://anywhere.pwisetthon.com/" + urls);
        if (response5.status == 404) {
          urls = "https://minecraftitemids.com/item/64/" + test + ".png";
        }
        const response6 = await fetch("https://anywhere.pwisetthon.com/" + urls);
        if (response6.status == 404) {
          urls = "https://mc.nerothe.com/img/1.19.2/" + test + ".png";
        }
        const secondlastchange = await fetch(
          "https://anywhere.pwisetthon.com/" + urls
        );
        if (secondlastchange.status == 404) {
          //split string by -
          let split = test.split("-");
          //loop
          for (let i = 0; i < split.length; i++) {
            test = split[i];
            urls =
              "https://minecraftfaces.com/wp-content/bigfaces/big-" +
              test +
              "-face.jpg";
            const response7 = await fetch(
              "https://anywhere.pwisetthon.com/" + urls
            );
            //const movies = await response.json();
            //if response is 404 then return png url
            if (response7.status == 404) {
              urls =
                "https://minecraftfaces.com/wp-content/bigfaces/big-" +
                test +
                "-face.png";
            }
            const response8 = await fetch(
              "https://anywhere.pwisetthon.com/" + urls
            );
            if (response8.status == 404) {
              urls = "https://minecraftitemids.com/item/64/" + test + ".png";
            }
            const response9 = await fetch(
              "https://anywhere.pwisetthon.com/" + urls
            );
            if (response9.status == 404) {
              urls = "https://mc.nerothe.com/img/1.19.2/" + test + ".png";
            }
            const lasttest = await fetch(
              "https://anywhere.pwisetthon.com/" + urls
            );
            if (lasttest.status != 404) {
              //end loop
              break;
            }
          }
        }
      }
      urls = "https://img.gs/fhcphvsghs/64x64,crop/" + urls;
      return urls;
    }
  
    //let promise = getusername();
  
    //create function convert unix time to datetime
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

    function checkUnixTimeif14days(unix_timestamp) {
      var date = new Date(unix_timestamp * 1000);
      //if 14 days ago
      var date14daysago = new Date();
      date14daysago.setDate(date14daysago.getDate() - 14);
      if (date < date14daysago) {
        return true;
      } else {
        return false;
      }
	  }
  
    //const placements = ['top', 'right', 'left', 'bottom'];
  
    let activeIndex = 0;
  </script>
  
  <Styles />
  
  <Navbar color="dark" dark expand="md">
    <Container sm style="display: flex;">
      <NavbarBrand href="/">PWMC CoreProtect Log</NavbarBrand>
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
  
  <!--h1>Hello {name}!</h1-->
  
  <!--h1>Hello {test()}!</h1-->
  
  <Container md>
    <center><h1>ค้นหา Log การทุบหรือวางบล็อก</h1></center>
  
    
    <Row>
      <Col class="my-auto" xs="auto"><p>ดู Log โดยใช้ X,Y,Z</p></Col>
      <Col
        ><FormGroup floating label="X">
          <Input
            type="number"
            name="number"
            id="x"
            placeholder="number placeholder"
          /></FormGroup
        ></Col
      >
      <Col
        ><FormGroup floating label="Y">
          <Input
            type="number"
            name="number"
            id="y"
            placeholder="number placeholder"
          /></FormGroup
        ></Col
      >
      <Col
        ><FormGroup floating label="Z">
          <Input
            type="number"
            name="number"
            id="z"
            placeholder="number placeholder"
          /></FormGroup
        ></Col
      >
      <Col
        ><FormGroup floating label="บวก/ลบ">
          <Input
            type="number"
            name="number"
            id="plus"
            placeholder="number placeholder"
          /></FormGroup
        ></Col
      >
      <Col class="my-auto" xs="auto">
        <Button
          outline
          color="primary"
          on:click={() => wowblock()}
          >ค้นหา</Button>
      </Col>
    </Row>
  
    <Row>
      <Col xs="2" style="display: none;margin: auto;margin-left: 0;margin-right: 0;"
        ><p>ดู Log ตาม Player</p></Col
      >
      <Col xs="auto" style="display: none;margin-bottom: 5px">
        {#await getallusername() then value}
          {#each value as item}
            <!-- if have # character on item.user  -->
            {#if item.user.indexOf("#") != -1}
              <!-- remove # from item.user -->
              <Button
                outline
                color="primary"
                on:click={() => wowplayer(item.userid)}
                style="margin-right: 5px"
                ><Avatar
                  randomBgColor
                  initials={item.user.replace("#", "")}
                  src="https://minecraftfaces.com/wp-content/bigfaces/big-{item.user.replace(
                    '#',
                    ''
                  )}-face.png"
                /></Button
              >
            {:else}
              <Button
                outline
                color="primary"
                on:click={() => wowplayer(item.userid)}
                style="margin-right: 5px"
                ><Avatar
                  randomBgColor
                  initials={item.user}
                  src="https://cravatar.eu/avatar/{item.user}"
                /></Button
              >
            {/if}
            <!--Avatar randomBgColor initials="{item.user}" src="https://cravatar.eu/avatar/{item.user}"/-->
          {/each}
        {/await}
      </Col>
    </Row>
  
    <Row>
      <Col xs="auto" class="my-auto"
        ><p>ดู Log ตาม Player</p></Col
      >
      <Col>
      {#await getallusernamecarousel() then value}
        <Carousel dark bind:activeIndex>
          <div class="carousel-inner">
            {#each value as items, index}
              <CarouselItem bind:activeIndex itemIndex={index}>
                <center>
                  {#each items as item}
                    {#if item.user.indexOf("#") != -1}
                      <!-- remove # from item.user -->
                      <Button
                        outline
                        color="primary"
                        on:click={() => wowplayer(item.userid)}
                        style="margin-right: 5px;display: none;"
                        ><Avatar
                          randomBgColor
                          initials={item.user.replace("#", "")}
                          src="https://minecraftfaces.com/wp-content/bigfaces/big-{item.user.replace(
                            '#',
                            ''
                          )}-face.png"
                        /></Button
                      >
                      <a
                        href="https://mccplog.pwisetthon.com/?id={item.userid}"
                        id="userid{item.userid}"
                      >
                        <Button outline color="primary" style="margin-right: 5px;">
                          {#await getmonsterimage(item.user.replace("#", "")) then imgurl}
                            <Avatar
                              randomBgColor
                              initials={item.user.replace("#", "")}
                              src={imgurl}
                            />
                          {/await}
                        </Button>
                      </a>
                      <Tooltip target="userid{item.userid}" placement="bottom"
                        >{item.user.replace("#", "")}</Tooltip
                      >
                    {:else}
                      <Button
                        outline
                        color="primary"
                        on:click={() => playerchange(item.userid)}
                        style="margin-right: 5px;display: none;"
                        ><Avatar
                          randomBgColor
                          initials={item.user}
                          src="https://cravatar.eu/avatar/{item.user}"
                        /></Button
                      >
                      <a
                        href="https://mccplog.pwisetthon.com/?id={item.userid}"
                        id="userid{item.userid}"
                        on:click={() => playerchange(item.userid)}
                        ><Button outline color="primary" style="margin-right: 5px;"
                          ><Avatar
                            randomBgColor
                            initials={item.user}
                            src="https://cravatar.eu/avatar/{item.user}"
                          /></Button
                        ></a
                      >
                      <Tooltip target="userid{item.userid}" placement="bottom"
                        >{item.user}</Tooltip
                      >
                    {/if}
                  {/each}
                </center>
              </CarouselItem>
            {/each}
          </div>
  
          <a href on:click={() => (activeIndex = Math.max(activeIndex - 1, 0))}
            ><CarouselControl direction="prev" /></a
          >
          <a
            href
            on:click={() =>
              (activeIndex = Math.min(activeIndex + 1, value.length - 1))}
            ><CarouselControl direction="next" /></a
          >
        </Carousel>
      {/await}
      </Col>
    </Row>
  
    <Row>
      {#each items as item}
        <Col xs="4" sm="3">
          <Card class="mb-3">
            <CardHeader>
              {#await getusername(item.user) then value}
                <CardTitle>
                  <Row>
                    <Col>ลำดับ {item.id}</Col>
                    <Col class="test d-inline-flex">
                      {#if value.indexOf("#") != -1}
                        {#await getmonsterimage(value.replace("#", "")) then imgurl}
                          <Avatar
                            randomBgColor
                            name={value.replace("#", "")}
                            src={imgurl}
                            size="50px"
                          />
                        {/await}
                      {:else}
                        <Avatar
                          randomBgColor
                          name={value}
                          src="https://cravatar.eu/avatar/{value}"
                        />
                      {/if}
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
            {#await getusername(item.user) then value}
              {#if value.indexOf('#') == -1 || checkUnixTimeif14days(item.time) == true}
                <CardFooter>
                <!-- <a href="/rollback/?id={item.id}">
                  <Button outline color="primary" style="margin-right: 5px;">
                    Rollback / ย้อนบล็อกกับคืนมา
                  </Button>
                </a> -->
                  <a href="/rollback/?id={item.id}">
                    <Button outline color="primary" style="margin-right: 5px;">
                      Rollback / ย้อนบล็อกกับคืนมา
                    </Button>
                  </a>
                </CardFooter>
              {/if}
            {/await}
          </Card>
        </Col>
      {/each}
    </Row>
  
    <!--Pagination ariaLabel="Page navigation example">
          <PaginationItem disabled>
              <PaginationLink first href="#" />
          </PaginationItem>
          <PaginationItem disabled>
              <PaginationLink previous href="#" />
          </PaginationItem>
          {#await allcount() then value}
              {#each value as item}
              <PaginationItem active>
                  <PaginationLink href="#">
                      {item}
                  </PaginationLink>
              </PaginationItem>
              {/each}
          {/await}
          <PaginationItem active>
              <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
              <PaginationLink next href="#" />
          </PaginationItem>
          <PaginationItem>
              <PaginationLink last href="#" />
          </PaginationItem>
      </Pagination-->
  
    <!--LightPaginationNav
          totalItems="{items.length}"
          pageSize="{pageSize}"
          currentPage="{currentPage}"
          limit="{1}"
          showStepOptions="{true}"
          on:setPage="{(e) => currentPage = e.detail.page}"
        /-->
  
    <!--Row>
          {#each $drinkNames as drinkName}
          <Col xs="4" sm="3">
              <Card class="mb-3">
                  <CardHeader>
                      {#await getusername(drinkName.user) then value}
                      <CardTitle>
                          <Row>
                              <Col>ลำดับ {drinkName.id}</Col>
                              <Col><Avatar name="{value}" src="https://cravatar.eu/avatar/{value}" /></Col>
                          </Row>
                      </CardTitle>
                      {/await}
                    
                  </CardHeader>
                  <CardBody>
                    <!--CardSubtitle>Card subtitle</CardSubtitle-->
    <!--CardText>
                      <ul>
                          <!--
                          {#await getusername(drinkName.user) then value}
                          <li>ผู้เล่น {value}</li>
                          {/await}
                          -->
    <!--li>ไอดี {getusername(drinkName.user).then((value) => {return value})}</li-->
    <!--li>วันที่ {convertUnixTime(drinkName.time)}</li>
                          <li>ตำแหน่ง {drinkName.x} {drinkName.y} {drinkName.z}</li>
                          <li>บล็อก {drinkName.type}</li>
                          <li>{#if drinkName.action == 0}
                              ทุบบล็อก
                          {:else}
                              วางบล็อก
                          {/if}</li>
                      </ul>
                    </CardText>
                    <!--Button>Button</Button-->
    <!--/CardBody>
                  <!--CardFooter>Footer</CardFooter-->
    <!--/Card>
          </Col>
          {/each}
      </Row-->
  
    <!--ul>
          {#each $drinkNames as drinkName}
              <li>ลำดับ {drinkName.id}
                  <ul>
                      {#await getusername(drinkName.user) then value}
                      <li>ผู้เล่น {value}</li>
                      {/await}
                      <!--li>ไอดี {getusername(drinkName.user).then((value) => {return value})}</li-->
    <!--li>วันที่ {convertUnixTime(drinkName.time)}</li>
                      <li>ตำแหน่ง {drinkName.x} {drinkName.y} {drinkName.z}</li>
                      <li>บล็อก {drinkName.type}</li>
                      <li>{#if drinkName.action == 0}
                          ทุบบล็อก
                      {:else}
                          วางบล็อก
                      {/if}</li>
                  </ul>
              </li>
          {/each}
      </ul-->
  
    <!-- {#await allcount() then value} -->
    {#if totalItemsvalue > 0}
      <LightPaginationNav
        totalItems={totalItemsvalue}
        pageSize="40"
        currentPage={indexpage}
        limit={6}
        showStepOptions={true}
        on:setPage={(e) => wow(e.detail.page)}
      />
    {/if}
    <!-- {/await} -->
  </Container>