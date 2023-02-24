export class Profile {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed
  }
}

export class Account extends Profile{
  constructor(data){
    super(data)
    this.email = data.email
  }
}
