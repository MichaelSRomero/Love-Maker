class RandomArray {
  constructor(array) {
    this.array = array;
    this.newArray = [...array];
  }

  randomize() {
    return new Promise((resolve, reject) => {
      if (this.array.length > 1) {

        fetch(`https://words.bighugelabs.com/api/2/51bf5e6f12d9256669d1020cc4d87cfd/${this.array[1]}/json`)
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            const synArray = myJson.adjective.syn;
            if (synArray) {
              console.log("SUCCESS: ", synArray);
              
              const randomIndex = Math.floor(Math.random() * synArray.length);
              this.newArray[1] = synArray[randomIndex]
            }
            resolve(this.newArray)
          }) 
          .catch(error => {
            // Print out the error if any
            console.log(`ERROR FOR: ${this.newArray[1]}`, error);
            
            this.newArray[1] = this.array[1];
            resolve(this.newArray)
          });
      } else {
        resolve(this.array);
      }
      
    })
  }

}