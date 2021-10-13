# saveo-task-back-end
1.To add CSV file in database:
    use url as "baseurl/uploadCSV" and while passing the csv file make sure it's key is set as "file"
    
2.To search a particular medicine:
    use url as "baseurl/searchMedicine/medicinename" here pass the medicine name you want to search in params
    if you don't pass any params you will get all the medicine names
3.To get a particular medicine details
    use url as "baseurl/getMedicineDetails/c_unique_id" here pass the csv document unique id as param
    if you don't enter any param you will recieve a 404 error
4.To place orders:
    use url as "baseurl/placeorder" and provide the input as 
    [
      {
        "c_unique_id" : "xxx", // String
        "quantity" : 10, // Number
        "c_name" : "xxxx" // String
      }
    ]
    use the above syntax for placing an order , if order is placed successfully then you will recieve a unique order ID
