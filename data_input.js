
const fs = require('fs');
const fire = require('./src/util/fire').default;

fire.database().ref('/assets').once('value').then((snapshot) => {
  // Backup database each time this file is executed to prevent data loss during
  // tests:
  let backup = undefined;
  if("BACKUP" === process.argv[2]) {
    backup = { assets: snapshot.val() };
  }
  var data = {
    backup: backup,
    carousel: [
      {
        info: {
          image_name: 'carousel image 1',
          description: ''
        },
        path: '../../assets/img/img1.jpg',
        root: '../../www/'
      },
      {
        info: {
          image_name: 'carousel image 2',
          description: ''
        },
        path: '../../assets/img/img2.jpg',
        root: '../../www/'
      },
      {
        info: {
          image_name: 'carousel image 3',
          description: ''
        },
        path: '../../assets/img/img3.jpg',
        root: '../../www/'
      },
      {
        info: {
          image_name: 'carousel image 4',
          description: ''
        },
        path: '../../assets/img/img4.jpg',
        root: '../../www/'
      }
    ],
    hours: [
      { name: 'Monday' , hours: '09:00AM - 09:00PM' },
      { name: 'Tuesday' , hours: '09:00AM - 09:00PM' },
      { name: 'Wednesday' , hours: '09:00AM - 09:00PM' },
      { name: 'Thursday' , hours: '09:00AM - 09:00PM' },
      { name: 'Friday' , hours: '09:00AM - 01:00PM, 02:00PM - 09:00PM' },
      { name: 'Saturday' , hours: '09:00AM - 09:00PM' },
      { name: 'Sunday' , hours: '09:00AM - 09:00PM' }
    ],
    items: [
      {
        itemInfo: {
          item_name: 'Chicken',
          price: 4.99,
          unit: 'kg',
          description: 'Fresh chicken from the farms',
          sale_information: '',
          categories: ['Meat', 'Bird Meat']
        },
        fileInfo: { path: '../../assets/img//exim-food-item-img/Chicken/whole Chicken.jpg' },
        root: '../../www'
      },
      {
        itemInfo: {
          item_name: 'Carrots',
          price: 2.50,
          unit: 'kg',
          description: 'Fresh colourful carrots',
          sale_information: '',
          categories: ['Vegetables']
        },
        fileInfo: { path: '../../assets/img//exim-food-item-img/Beef/Beef 1.jpg' },
        root: '../../www'
      },
      {
        itemInfo: {
          item_name: 'Cauliflower',
          price: 5.00,
          unit: 'kg',
          description: 'Fresh clean Cauliflower',
          sale_information: '',
          categories: ['Vegetables']
        },
        fileInfo: { path: '../../assets/img//exim-food-item-img/Beef/Beef 1.jpg' },
        root: '../../www'
      },
      {
        itemInfo: {
          item_name: 'Beef',
          price: 5.99,
          unit: 'kg',
          description: 'Fresh beef from the farms',
          sale_information: '',
          categories: ['Meat', 'Cattle Meat']
        },
        fileInfo: { path: '../../assets/img//exim-food-item-img/Beef/Beef 1.jpg' },
        root: '../../www'
      },
      {
        itemInfo: {
          item_name: 'Duck',
          price: 5.99,
          unit: 'kg',
          description: 'Fresh duck',
          sale_information: '',
          categories: ['Meat', 'Bird Meat']
        },
        fileInfo: { path: '../../assets/img//exim-food-item-img/Chicken/Duck.jpg' },
        root: '../../www'
      }
    ],
    test: {
      test_name: 'pushAssetInfoTest',
      test_data: 'data'
    }
  }
  fs.writeFileSync('./database_data.json', JSON.stringify(data));
  var readData = JSON.parse(fs.readFileSync('./database_data.json'));
  console.assert(readData.test.test_name === data.test.test_name);
  if("BACKUP" === process.argv[2]) {
    console.assert(
      readData.backup.assets.hours[0].name === data.backup.assets.hours[0].name
    );
  }
  console.log('Database backup and test data write complete');
  process.exit(0);
});
