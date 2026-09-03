const CreateFormView = () => {
    let htmlContent = `
            <h1>Thêm sách</h1>
            <form action='/books/create' method='POST'>
                <label>Tên sách</label>
                <input type='text' name='title'></input>
                <label>Tên tác giả</label>
                <input type='text' name='author'></input>
                <label>Giá sách</label>
                <input type='text' name='price'></input>
                <label>Năm xuất bản</label>
                <input type='text' name='year'></input>
            </form>
        `;
    return htmlContent;
}
module.exports = CreateFormView;