class CustomerModel {
    constructor() {
        this.customers = [
            { id: 1, fullname: "Nguyen Van A", email: "a@gmail.com", phone: "0123456789", address: "Hanoi" },
            { id: 2, fullname: "Tran Thi B", email: "b@gmail.com", phone: "0987654321", address: "HCM" }
        ];
    }
    
    getAll() {
        return this.customers;
    }
    
    getById(id) {
        return this.customers.find(c => String(c.id) === String(id));
    }

    search(keyword) {
        return this.customers.filter(c => c.fullname.toLowerCase().includes(keyword.toLowerCase()));
    }

    create({ fullname, email, phone, address }) {
        const newId = this.customers.length > 0 ? Math.max(...this.customers.map(c => c.id)) + 1 : 1;
        const newCustomer = { id: newId, fullname, email, phone, address };
        this.customers.push(newCustomer);
        return newCustomer;
    }

    update(id, data) {
        const index = this.customers.findIndex(c => String(c.id) === String(id));
        if (index !== -1) {
            const updateData = {};
            for (let key in data) {
                if (data[key] !== undefined) {
                    updateData[key] = data[key];
                }
            }
            this.customers[index] = { ...this.customers[index], ...updateData };
            return this.customers[index];
        }
        return null;
    }

    delete(id) {
        const index = this.customers.findIndex(c => String(c.id) === String(id));
        if (index !== -1) {
            this.customers.splice(index, 1);
            return true;
        }
        return false;
    }
}
module.exports = new CustomerModel();