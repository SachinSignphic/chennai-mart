
var dataArray = [
  { customer: 'Frank', orderId: '58' },
  { customer: 'Alice', orderId: '910' },
  { customer: 'Charlie', orderId: '303132' },
  { customer: 'David', orderId: '242526' },
  { customer: 'Isaac', orderId: '151617' },
  { customer: 'Grace', orderId: '24256' },
  { customer: 'Eve', orderId: '91091' },
  { customer: 'David', orderId: '24226' },
  { customer: 'Hannah', orderId: '91011' },
  { customer: 'Alice', orderId: '5678' }
];

const statusOptions = [
  "received", "processing", "delivered", 
  "dispatched", "return-initiated", "returned", 
  "refund-initiated", "refunded"
];

// Function to generate a random status
function getRandomStatus() {
  const randomIndex = generateRandom();
  return statusOptions[randomIndex];
}

// Function to generate a random name
function getRandomName() {
    const names = ['Vladimir', 'Nikolai', 'Irina', 'Anastasia', 'Sergei', 'Dmitri', 'Yelena', 'Aleksandr', 'Yulia', 'Viktor'];
    return names[Math.floor(Math.random() * names.length)];
}

// Function to generate a random address
function getRandomAddress() {
    const addresses = ['Moscow', 'Saint Petersburg', 'Kiev', 'Minsk', 'Sofia', 'Bucharest', 'Warsaw', 'Budapest', 'Prague', 'Bratislava'];
    return addresses[Math.floor(Math.random() * addresses.length)];
}

// Create an array of drivers
const drivers = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: getRandomName(),
    address: getRandomAddress()
}));

export {drivers};

export const columns = [
    { field: "id", headerName: "Order ID", width: 90 },
    {
        field: "name",
        headerName: "Name",
        width: 150,
        editable: false,
    },
    {
        field: "address",
        headerName: "Address",
        width: 200,
        editable: false,
    },
    {
        field: "products",
        headerName: "Products",
        width: 100,
        editable: false,
        valueGetter: (params) => params.row.items.reduce((prev, curr) => prev + curr.quantity, 0)
    },
    {
        field: "date",
        headerName: "Date",
        // description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 200,
        // valueGetter: (params) =>
        //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: "driver",
        headerName: "Driver",
        type: "string",
        width: 150,
        editable: false,
    },
];

export const rows = [
  {
    id: dataArray[0].orderId,
    name: dataArray[0].customer,
    address: "123 Elm Street",
    products: 8,
    date: new Date().toLocaleString(),
    status: getRandomStatus(),
    driver: "Michael",
    items: [
      { productId: 1, name: "Apple", price: 50, quantity: 3 },
      { productId: 2, name: "Banana", price: 120, quantity: 2 }
    ]
  },
  {
    id: dataArray[1].orderId,
    name: dataArray[1].customer,
    address: "456 Oak Avenue",
    products: 12,
    date: new Date().toLocaleString(),
    status: getRandomStatus(),
    driver: "Sarah",
    items: [
      { productId: 3, name: "Tomato", price: 150, quantity: 4 },
      { productId: 4, name: "Lettuce", price: 90, quantity: 3 },
      { productId: 5, name: "Cucumber", price: 200, quantity: 2 }
    ]
  },
  {
    id: dataArray[2].orderId,
    name: dataArray[2].customer,
    address: "789 Maple Lane",
    products: 5,
    date: new Date().toLocaleString(),
    status: getRandomStatus(),
    driver: "Alex",
    items: [
      { productId: 6, name: "Orange", price: 70, quantity: 5 },
      { productId: 7, name: "Carrot", price: 180, quantity: 2 }
    ]
  },
  {
    id: dataArray[3].orderId,
    name: dataArray[3].customer,
    address: "101 Pine Road",
    products: 15,
    date: new Date().toLocaleString(),
    status: getRandomStatus(),
    driver: "Emily",
    items: [
      { productId: 8, name: "Grapes", price: 110, quantity: 2 },
      { productId: 9, name: "Spinach", price: 250, quantity: 3 },
      { productId: 10, name: "Potato", price: 80, quantity: 6 }
    ]
  },
  {
    id: dataArray[4].orderId,
    name: dataArray[4].customer,
    address: "246 Cedar Drive",
    products: 10,
    date: new Date().toLocaleString(),
    status: getRandomStatus(),
    driver: "Daniel",
    items: [
      { productId: 11, name: "Pear", price: 200, quantity: 3 },
      { productId: 12, name: "Broccoli", price: 130, quantity: 2 }
    ]
  },
  {
    id: dataArray[5].orderId,
    name: dataArray[5].customer,
    address: "369 Birch Street",
    products: 7,
    date: new Date().toLocaleString(),
    status: getRandomStatus(),
    driver: "Olivia",
    items: [
      { productId: 13, name: "Pineapple", price: 180, quantity: 4 },
      { productId: 14, name: "Bell Pepper", price: 100, quantity: 3 }
    ]
  },
  {
    id: dataArray[6].orderId,
    name: dataArray[6].customer,
    address: "482 Walnut Avenue",
    products: 9,
    date: new Date().toLocaleString(),
    status: getRandomStatus(),
    driver: "William",
    items: [
      { productId: 15, name: "Cherry", price: 60, quantity: 3 },
      { productId: 16, name: "Zucchini", price: 300, quantity: 1 }
    ]
  },
  {
    id: dataArray[7].orderId,
    name: dataArray[7].customer,
    address: "573 Spruce Lane",
    products: 11,
    date: new Date().toLocaleString(),
    status: getRandomStatus(),
    driver: "Emma",
    items: [
      { productId: 17, name: "Strawberry", price: 250, quantity: 2 },
      { productId: 18, name: "Celery", price: 150, quantity: 4 }
    ]
  },
  {
    id: dataArray[8].orderId,
    name: dataArray[8].customer,
    address: "694 Poplar Road",
    products: 6,
    date: new Date().toLocaleString(),
    status: getRandomStatus(),
    driver: "James",
    items: [
      { productId: 19, name: "Watermelon", price: 180, quantity: 1 },
      { productId: 20, name: "Cauliflower", price: 120, quantity: 3 }
    ]
  },
  {
    id: dataArray[9].orderId,
    name: dataArray[9].customer,
    address: "707 Sycamore Drive",
    products: 14,
    date: new Date().toLocaleString(),
    status: getRandomStatus(),
    driver: "Ava",
    items: [
      { productId: 21, name: "Kiwi", price: 200, quantity: 2 },
      { productId: 22, name: "Eggplant", price: 170, quantity: 3 },
      { productId: 23, name: "Onion", price: 140, quantity: 5 }
    ]
  }
].map((data, index) => ({
    ...data,
    driver: drivers[index].id // Assuming "driver" field should contain the driver's name
}));


export const randomDriverOrderColumns = [
    { field: "id", headerName: "Order ID", width: 80 },
    {
        field: "name",
        headerName: "Name",
        width: 80,
        editable: false,
    },
    {
        field: "date",
        headerName: "Date",
        // description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 150,
        // valueGetter: (params) =>
        //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: "status",
        headerName: "Status",
        width: 120,
        editable: false,
    },
];

export const randomDriverOrderData = dataArray.map((each) => (
  {
    id: each.orderId,
    name: each.customer,
    date: new Date().toLocaleString(),
    status: getRandomStatus(),
  })
);

function generateRandomProduct() {
  const items = ["Apple", "Pineapple", "Milk", "Blueberry"];
  return items[generateRandom(4)]
}

function generateRandom(upto = 10) {
  return Math.floor(Math.random() * upto);
}

export const driverRequests = Array.from({ length: 4 }, (v, k) => ({
    id: k+1,
    name: getRandomName(),
}));

export const productRequests = Array.from({ length: 4 }, (v, k) => ({
    id: k+1,
    name: generateRandomProduct(),
}));