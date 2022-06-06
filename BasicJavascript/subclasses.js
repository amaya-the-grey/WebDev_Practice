class Media {
  constructor(title) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  get title() {
    return this._title;
  }
  get isCheckedOut() {
    return this._isCheckedOut;
  }
  get ratings() {
    return this._ratings;
  }
  set isCheckedOut(bool) {
    this._isCheckedOut = bool;
  }

  toggleCheckedOutStatus() {
    if (this._isCheckedOut === false) {
        this._isCheckedOut = true;
    } else {
      this._isCheckedOut = false;
    }
  }

  getAverageRating() {
    const initialValue = 0;
    const averageRating = this._ratings.reduce(
    (previousValue, currentValue) => previousValue + currentValue, 0) / this._ratings.length;
    return averageRating;
  }

  addRating(rating) {
    this._ratings.push(rating);
  }
}




class Book extends Media {
  constructor(author, pages, title) {
    super(title);
    this._author = author;
    this._pages = pages;
  }

  get author() {
    return this._author;
  }
  get pages() {
    return this._pages;
  }
}



class Movie extends Media {
  constructor(director, title, runTime) {
    super(title);
    this._director = director;
    this._runTime = runTime;
  }
  get director() {
    return this._director;
  }
  get runTime() {
    return this._runTime;
  }
}

const historyOfEverything = new Book('Bill Bryson', 544, 'A Short History of Nearly Everything');

historyOfEverything.toggleCheckedOutStatus();
console.log(historyOfEverything.isCheckedOut);

historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);

console.log(historyOfEverything.getAverageRating());
