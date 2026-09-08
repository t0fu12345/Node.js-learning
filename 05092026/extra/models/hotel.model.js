class HotelModel {
    constructor() {
        this.hotels = [
            { id: 1, name: "Khách sạn Hà Nội", address: "123 Ba Đình", city: "Hanoi", phone: "0123456789", star: 5 },
            { id: 2, name: "Sài Gòn Hotel", address: "456 Quận 1", city: "HCM", phone: "0987654321", star: 4 }
        ];
    }
    
    getAll() {
        return this.hotels;
    }
    
    getById(id) {
        return this.hotels.find(h => String(h.id) === String(id));
    }
    
    searchByCity(city) {
        return this.hotels.filter(h => h.city.toLowerCase().includes(city.toLowerCase()));
    }

    create({ name, address, city, phone, star }) {
        const newId = this.hotels.length > 0 ? Math.max(...this.hotels.map(h => h.id)) + 1 : 1;
        const newHotel = { id: newId, name, address, city, phone, star };
        this.hotels.push(newHotel);
        return newHotel;
    }

    update(id, data) {
        const index = this.hotels.findIndex(h => String(h.id) === String(id));
        if (index !== -1) {
            // Lọc ra các trường có giá trị để cập nhật, tránh ghi đè bằng undefined
            const updateData = {};
            for (let key in data) {
                if (data[key] !== undefined) {
                    updateData[key] = data[key];
                }
            }
            this.hotels[index] = { ...this.hotels[index], ...updateData };
            return this.hotels[index];
        }
        return null;
    }

    delete(id) {
        const index = this.hotels.findIndex(h => String(h.id) === String(id));
        if (index !== -1) {
            this.hotels.splice(index, 1);
            return true;
        }
        return false;
    }
}
module.exports = new HotelModel();
