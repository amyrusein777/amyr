document.addEventListener("alpine:init", () => {
  Alpine.data("usersdata", () => ({
    users: [],
    mainusers: [],
    pageusers: [],
    pagecount: 1,
    itemscount: 5,
    currentpage: 1,
    searchbar: "",
    isloading: false,
    showaddmodal: false,
    getusers() {
      (this.isloading = true),
        axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then((res) => {
            this.users = res.data;
            this.mainusers = res.data;
            
            this.pagination();
          })
          .finally(() => {
            this.isloading = false;
          });
    },
    pagination() {
      this.pagecount = Math.ceil(this.users.length / this.itemscount);
      const start = this.currentpage * this.itemscount - this.itemscount;
      const end = this.currentpage * this.itemscount;
      this.pageusers = this.users.slice(start, end);
      console.log(this.pageusers);
    },

    nextpage() {
      this.currentpage++;
      if (this.currentpage > this.pagecount) this.currentpage = this.pagecount;
      this.pagination();
    },
    prevpage() {
      this.currentpage--;
      if (this.currentpage < 1) this.currentpage = 1;
      this.pagination();
    },

    handlechangeitemscount(e) {
      this.itemscount = e.value;
      if (this.itemscount < 1) this.itemscount = 1;
      if (this.itemscount > this.users.length)
        this.itemscount = this.users.length;
      this.pagination();
    },

    handlesearch(value){
this.users = this.mainusers.filter(user=>(user.name.includes(value) ||
 user.username.includes(value) ||
 user.email.includes(value) ))
this.currentpage = 1
this.pagination()
    },

  }));
});
