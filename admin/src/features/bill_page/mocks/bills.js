export const bill = {
    id: 1,
    customer: {
        name: 'Nguyễn Văn A',
        phone: '0123456789',
        address: '123 đường ABC, Quận XYZ, TP HCM',
    },
    dentist: {
        name: 'Nguyễn Nha Sĩ',
    },
    dentalVisitDate: '12-12-2023',
    medicines: [
        {
            id: 1,
            name: 'Thuốc A',
            price: 10000,
            quantity: 2,
        },
        {
            id: 2,
            name: 'Thuốc B',
            price: 20000,
            quantity: 1,
        },
        {
            id: 3,
            name: 'Thuốc C',
            price: 30000,
            quantity: 3,
        },
        {
            id: 4,
            name: 'Thuốc D',
            price: 30000,
            quantity: 2,
        },
    ],
    services: [
        {
            id: 1,
            name: 'Dịch vụ A',
            price: 10000,
        },
        {
            id: 2,
            name: 'Dịch vụ B',
            price: 20000,
        },
        {
            id: 3,
            name: 'Dịch vụ C',
            price: 30000,
        },
    ],
    total: 666666,
}