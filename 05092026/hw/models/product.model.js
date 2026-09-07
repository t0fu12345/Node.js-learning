class ProductModel {
    constructor() {
        this.products = [
            {
                _id: 1,
                prod_name: "iPhone 15 Pro Max",
                cat_id: 1,
                price: 29990000,
                image: "https://example.com/iphone15.jpg",
                content: "Flagship mới nhất của Apple với khung Titan siêu nhẹ.",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                _id: 2,
                prod_name: "Samsung Galaxy S24 Ultra",
                cat_id: 1,
                price: 31990000,
                image: "https://example.com/s24ultra.jpg",
                content: "Điện thoại AI đỉnh cao từ Samsung, kèm bút S-Pen.",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ]
    }

    getAll() {
        return this.products;
    }

    getById(_id) {
        return this.products.find(p => String(p._id) === String(_id))
    }

    create({ prod_name, cat_id, price, img, content }) {
        const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p._id)) + 1 : 1;
        const created_at = new Date().toISOString();
        const updated_at = new Date().toISOString();
        const newProd = {
            _id: newId,
            prod_name: prod_name,
            cat_id: cat_id,
            price: price,
            image: img,
            content: content,
            created_at: created_at,
            updated_at: updated_at
        }
        this.products.push(newProd);
        return newProd;
    }

    update(_id, { prod_name, cat_id, price, img, content, create_at }) {
        const index = this.products.findIndex(p => String(p._id) === String(_id))
        if (index !== -1) {
            this.products[index].prod_name = prod_name;
            this.products[index].cat_id = cat_id;
            this.products[index].price = price;
            this.products[index].image = img;
            this.products[index].content = content;
            this.products[index].created_at = create_at;
            this.products[index].updated_at = new Date().toISOString();
            return this.products[index];
        }

        return null;
    }

    delete(_id) {
        const index = this.products.findIndex(p => String(p._id) === String(_id))
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }

        return false;
    }
}

module.exports = new ProductModel();