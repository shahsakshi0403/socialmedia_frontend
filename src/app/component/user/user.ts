export class userData {
    constructor(
        public firstName: string,
        public lastName: string,
        public email?: string,
        public password?: string,
        public userName?: string,
        public dob?: Date
    ) { }
}