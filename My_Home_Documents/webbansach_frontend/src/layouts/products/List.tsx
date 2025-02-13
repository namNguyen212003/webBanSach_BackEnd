// import React from "react";
// import BookProps from "./component/BookProps";

// // React.FC xác định đây là một functional component trong React.


// const List: React.FC = () => {
//     const books: Book[] = [ // books kieu du lieu la nhung cuon Books
//         // sau nay DB dc goi du lieu len tu json
//         {
//             id: 1,
//             title: 'Book1',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/1.webp'
//         },
//         {
//             id: 2,
//             title: 'Book2',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/2.jpg'
//         },
//         {
//             id: 3,
//             title: 'Book3',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/3.webp'
//         },
//         {
//             id: 4,
//             title: 'Book4',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/4.webp'
//         },
//         {
//             id: 5,
//             title: 'Book5',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/5.webp'
//         },
//         {
//             id: 6,
//             title: 'Book6',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/6.webp'
//         },
//         {
//             id: 7,
//             title: 'Book7',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/7.webp'
//         },
//         {
//             id: 8,
//             title: 'Book8',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/8.webp'
//         },
//         {
//             id: 1,
//             title: 'Book1',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/1.webp'
//         },
//         {
//             id: 2,
//             title: 'Book2',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/2.jpg'
//         },
//         {
//             id: 3,
//             title: 'Book3',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/3.webp'
//         },
//         {
//             id: 4,
//             title: 'Book4',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/4.webp'
//         },
//         {
//             id: 5,
//             title: 'Book5',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/5.webp'
//         },
//         {
//             id: 6,
//             title: 'Book6',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/6.webp'
//         },
//         {
//             id: 7,
//             title: 'Book7',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/7.webp'
//         },
//         {
//             id: 8,
//             title: 'Book8',
//             description: 'Description for Book 1',
//             originalPrice: 50000,
//             price: 45000,
//             imageUrl:'./../../../images/books/8.webp'
//         },
//     ];
//     // hiển thị sản phẩm    
//     return (
//         <div className="container">
//             <div className="row mt-2">
//                 {
//                     books.map((i) => (
//                             <BookProps book={i}/> // để bỏ thong tin: bỏ 1 quyển = 1 quyển từ mảng ra.
//                         )
//                     ) 
//                 }
//             </div>
//         </div>
//     )
// }
// export default List;