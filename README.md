# ELEC 3 - Node.js

**Name:** Mark Neilson Tol
**Section:** IV-BSIT C
**Course:** ELEC 3 - Node.js

## Activities (Set 1)

| Activity | Description | Folder |
|---|---|---|
| N1 | Project setup with npm, package.json, and installed packages | [set1/n1-setup](set1/n1-setup) |
| N2 | Modular calculator using custom modules and process.argv | [set1/n2-calculator](set1/n2-calculator) |
| N3 | File manager using the fs and path modules | [set1/n3-file-manager](set1/n3-file-manager) |

## How to run

**N1**

```
cd set1/n1-setup
npm install
npm start
```

**N2**

```
cd set1/n2-calculator
node index.js add 12 8
node index.js divide 5 0
```

Operations: add, subtract, multiply, divide, average

**N3**

```
cd set1/n3-file-manager
node index.js create notes.txt "Hello"
node index.js read notes.txt
node index.js update notes.txt "More text"
node index.js delete notes.txt
node index.js list
```

## Screenshots

### N1
![N1 version check](set1/n1-setup/screenshots/n1_version_check.png)
![N1 package.json](set1/n1-setup/screenshots/n1_package_json.png)
![N1 npm start](set1/n1-setup/screenshots/n1_npm_start.png)

### N2
![N2 operations](set1/n2-calculator/screenshots/n2_operations.png)
![N2 errors](set1/n2-calculator/screenshots/n2_errors.png)

### N3
![N3 create](set1/n3-file-manager/screenshots/n3_create.png)
![N3 read and update](set1/n3-file-manager/screenshots/n3_read_update.png)
![N3 delete](set1/n3-file-manager/screenshots/n3_delete.png)
![N3 list](set1/n3-file-manager/screenshots/n3_list.png)