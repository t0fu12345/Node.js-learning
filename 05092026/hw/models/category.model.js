class CategoryModel {
    constructor() {
        this.categories = [
            {
                _id: 1,
                cat_name: "Điện thoại"
            },
            {
                _id: 2,
                cat_name: "Laptop"
            }
        ]
    }

    getAll() {
        return this.categories;
    }

    getById(_id) {
        return this.categories.find(c => String(c._id) === String(_id));
    }

    create({ cat_name }) {
        const newId = this.categories.length > 0 ? Math.max(...this.categories.map(c => c._id)) + 1 : 1;
        const newCat = {
            _id: newId,
            cat_name: cat_name
        }
        this.categories.push(newCat);
        return newCat;
    }

    update(_id, { cat_name }) {
        const index = this.categories.findIndex(c => String(c._id) === String(_id));
        if (index !== -1) {
            this.categories[index].cat_name = cat_name;
            return this.categories[index];
        }

        return null;
    }

    delete(_id) {
        const index = this.categories.findIndex(c => String(c._id) === String(_id));
        if (index !== -1) {
            this.categories.splice(index, 1);
            return true; //xoa thanh cong
        }
        return false;
    }
}
module.exports = new CategoryModel();