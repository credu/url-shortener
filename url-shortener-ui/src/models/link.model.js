export class Link {
    #id;
    #alias;
    #url;
    #creator;

    constructor({ id, alias, url, creator }) {
        this.#id = id;
        this.#alias = alias;
        this.#url = url;
        this.#creator = creator;
    }

    get id() {
        return this.#id;
    }
    get alias() {
        return this.#alias;
    }
    get url() {
        return this.#url;
    }
    get creator() {
        return this.#creator;
    }
}
