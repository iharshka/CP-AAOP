document.addEventListener("DOMContentLoaded", () => {
  var cpusername = "iharshka"; //Default username whom data will be displayed
  fetchcps(cpusername);
  document.getElementById("fetchcpsbtn").addEventListener("click", fetchcps);
});
async function fetchcps(cpusername) {
  if (document.getElementById("cpusername").value)
    cpusername = document.getElementById("cpusername").value;
  console.log(cpusername);

  var fetchurl =
    "https://codeforces.com/api/user.info?handles=" + `${cpusername}`;
  console.log(fetchurl);

  const xhttpr = new XMLHttpRequest();
  xhttpr.open("GET", fetchurl, true);

  xhttpr.send();

  xhttpr.onload = () => {
    if (xhttpr.status == 200) {
      const response = JSON.parse(xhttpr.responseText);
      const result = response.result;
      console.log(result);
      // Process the response data here

      //dynamically adding CP platform heading
      var cphead = document.getElementById("cp1head");
      cphead.textContent = "\t Codeforces";

      var cpbody = document.getElementById("cp1body");
      console.log(result[0].country);
      cpbody.innerHTML = `
        Hey,  ${
          result[0].firstName ? result[0].firstName : result[0].handle
        }! Kudos to achieving these feats on Codeforces:

        <img src= ${result[0].avatar}>

        <b>Handle:</b> ${result[0].handle} 
        <b>Full Name:</b> ${result[0].firstName ? result[0].firstName : ""} ${
        result[0].lastName ? result[0].lastName : "not registered"
      }
        <b>Organization:</b> ${
          result[0].organization ? result[0].organization : "not registered"
        } 
        <b>Country:</b> ${
          result[0].country ? result[0].country : "not registered"
        } 
        <b>Current Rank:</b> ${result[0].rank ? result[0].rank : "unrated"} 
        <b>Max Rank:</b> ${result[0].maxRank ? result[0].maxRank : "unrated"} 
        <b>Rating:</b> ${result[0].rating ? result[0].rating : "unrated"}
        
        This was it for now! Wish you maximum ratings :)`;
    } else {
      alert("Codeforces username doesn't exist");
    }
  };
}
