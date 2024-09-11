# Become a mongoose master.

- **mongoShell command**

  - show db
  - make collection in db
  - find all document
  - insertOne()
  - insertMany()
  - Find via filtering with field filter

---

```javascript
// Filtering with or via {field_Filtering: 1}
/* Where mongoose_practice is a collection of documents */
db.mongoose_practice.find(
  { gender: "Male" },
  { gender: 1, name: 1, email: 1, age: 1 }
);

// Filtering with project method
db.mongoose_practice
  .find({ age: 17 })
  .project({ gender: 1, age: 1, name: 1, email: 1 });
```

---

## Mongodb Operators

### Working on mongodb operators listed below. Ref **_[MongodbQuery(Operators)](https://www.mongodb.com/docs/manual/reference/operator/query/)_**

### 1. Comparison Operators;

> **_$eq, $ne, $gt, $lt, $gte, $lte, $in, $nin_**
>
> > $eq = Equal To  <br>
>> $ne = Not Equal To <br> >> $gt = Grater Than <br>
>> $gte = Grater Than And Equal To <br> >> $lt = Less Than <br>
>> $lte = Less Than And Equal To <br>

```js
/*
 In this example bellow we use $in operator which will take value as an array and return data which will satisfy array's data.

=> So The result will like find those data which has age [18, 20, 22, 24, 26, 28, 30] like this.

=> and interest is also same

=> Like $in comparison operator we've $nin which is opposite of $in.

SIMPLE RIGHT ?
*/

db.mongoose_practice
  .find(
    {
      gender: {
        $eq: "Female",
      },
      age: {
        $in: [18, 20, 22, 24, 26, 28, 30],
      },
      interests: {
        $in: ["Cooking", "Gaming"],
      },
    },
    { gender: 1, age: 1, interests: 1 }
  )
  .sort({ age: 1 });


  /* Return Result Should Like This */
  {
	  "_id" : ObjectId("6406ad64fc13ae5a4000006d"),
	  "gender" : "Female",
	  "age" : 18,
	  "interests" : [ "Cooking", "Travelling", "Reading" ]
  }

```

### 2. Logical Operators

> **_$and, $not, $or, $nor_**

> $and <br>
>
> > => performs a logical _**`AND`**_ operation on an array of one or more expressions (`<expression1>`, `<expression2>`, and so on) and selects the documents that satisfy all the expressions. <br> > > **syntax** <br> > > `{ $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }`

```js
db.mongoose_practice.find({
    $and:
        [
            {
                gender: "Female"
                age: {
                    $gt: 15, $lt: 20
                },
                interests: {
                    $in: ["Travelling", "Cooking"]
                }
            }
        ]

})
    .project({ "name.firstName": 1, age: 1, gender: 1, interests: 1 })
    .sort({ age: 1 })
```

---

### `OR` Operator

```javascript
db.mongoose_practice
  .find({
    $or: [
      {
        "skills.name": {
          $in: ["Javascript", "PYTHON"],
        },
      },
    ],
  })
  .project({
    age: true,
    gender: true,
    interests: 1,
    "skills.name": 1,
  })
  .sort({
    age: 1,
  });
```

---

### `NOT` Operator

```javascript
// Behave  just the opposite of AND operator
```

---

### `NOR` Operator

```javascript
// Behave  just the opposite of OR operator
```

---

### `$exists` | `$type` | `$size` | `$all` | `$eleMatch` Operators

```javascript
// Element Query Operator $exists & $type

// $exist => to check field existance
db.mongoose_practice.find({ company: { $exists: true } });

// $type => to check field type
db.mongoose_practice.find({ age: { $type: "string" } });

// $type => using $type operator we can even find the null value field, undifind... etc  // We must use type as string "null" | "string"....etc
db.mongoose_practice.find({ company: { $type: "null" } }, { company: 1 });

// $size => to check empty arry from collection
db.mongoose_practice.find({ friends: { $size: 0 } }, { friends: 1 });
```
