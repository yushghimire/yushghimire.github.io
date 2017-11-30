class TimeCounter {

  constructor() {

    this.minutesLabel = document.getElementById("minutes");
    this.secondsLabel = document.getElementById("seconds");
    
    this.totalSeconds = 0;

  };

  format(val) {
    let valString = val + "";

    if (valString.length < 2) {

      return "0" + valString;
    
    } else {
    
      return valString;
    
    }
  };
  
  setTime() {
    
    this.totalSeconds++;
    
    this.secondsLabel.innerHTML = this.format(this.totalSeconds % 60);
    this.minutesLabel.innerHTML = this.format(parseInt(this.totalSeconds / 60));
  
  };

  resetTime() {

    this.totalSeconds = 0;
  }
}