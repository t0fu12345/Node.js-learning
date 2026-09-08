class RoomModel {
    constructor() {
        this.rooms = [
            { id: 1, hotel_id: 1, room_number: "101", room_type: "Deluxe", price: 1000, status: "available" },
            { id: 2, hotel_id: 1, room_number: "102", room_type: "Standard", price: 500, status: "occupied" },
            { id: 3, hotel_id: 2, room_number: "201", room_type: "Deluxe", price: 1200, status: "maintenance" }
        ];
    }
    
    getAll() {
        return this.rooms;
    }
    
    getById(id) {
        return this.rooms.find(r => String(r.id) === String(id));
    }
    
    getByHotelId(hotelId) {
        return this.rooms.filter(r => String(r.hotel_id) === String(hotelId));
    }

    search({ status, type }) {
        let results = this.rooms;
        if (status) {
            results = results.filter(r => r.status.toLowerCase() === status.toLowerCase());
        }
        if (type) {
            results = results.filter(r => r.room_type.toLowerCase().includes(type.toLowerCase()));
        }
        return results;
    }

    create({ hotel_id, room_number, room_type, price, status }) {
        const newId = this.rooms.length > 0 ? Math.max(...this.rooms.map(r => r.id)) + 1 : 1;
        const newRoom = { id: newId, hotel_id, room_number, room_type, price, status };
        this.rooms.push(newRoom);
        return newRoom;
    }

    update(id, data) {
        const index = this.rooms.findIndex(r => String(r.id) === String(id));
        if (index !== -1) {
            const updateData = {};
            for (let key in data) {
                if (data[key] !== undefined) {
                    updateData[key] = data[key];
                }
            }
            this.rooms[index] = { ...this.rooms[index], ...updateData };
            return this.rooms[index];
        }
        return null;
    }

    delete(id) {
        const index = this.rooms.findIndex(r => String(r.id) === String(id));
        if (index !== -1) {
            this.rooms.splice(index, 1);
            return true;
        }
        return false;
    }
}
module.exports = new RoomModel();