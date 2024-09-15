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

# Practice

```javascript
/**
 * 1.  Find all documents in the collection where the age is greater than 30, and only return the name and email fields.
 * 2.  Find documents where the favorite color is either "Maroon" or "Blue."
 * 3.  Find all documents where the skills is an empty array.
 * 4.  Find documents where the person has skills in both "JavaScript" and "Java."
 * 5.  Add a new skill to the skills array for the document with the email "aminextleveldeveloper@gmail.com" The skill is {"name": "Python", "level": "Beginner", "isLearning": true}.
 * 6.  Add a new language "Spanish" to the list of languages spoken by the person.
 * 7.  Remove the skill with the name "Kotlin" from the skills array.
 *
 */

///////////////////////////////////////////// Question 01 -> Answer /////////////////////////////////////////////////////////////////////////////////
// db.mongoose_practice.find({ age: { $gt: 30 } }, {name:1, email:1, age:1}).sort({age: 1}) // Type 1
// db.mongoose_practice.find({ age: { $gt: 30 } }).project({name:1, email:1, age:1}).sort({age: 1}) // Type 1

///////////////////////////////////////////// Question 02 -> Answer /////////////////////////////////////////////////////////////////////////////////
// db.mongoose_practice.find({$or:[{favoutiteColor:"Maroon"},{ favoutiteColor: "Blue"}]}).project({favoutiteColor:1})

///////////////////////////////////////////// Question 03 -> Answer /////////////////////////////////////////////////////////////////////////////////
// db.mongoose_practice.find({skills:{ $size: 0 }}, {skills:1}) // finding an empty array

///////////////////////////////////////////// Question 04 -> Answer /////////////////////////////////////////////////////////////////////////////////
// db.mongoose_practice.find({ $and:[{'skills.name': "JAVASCRIPT"}, {"skills.name": 'JAVA'}]}).project({ "skills.name": 1 })

///////////////////////////////////////////// Question 05 -> Answer /////////////////////////////////////////////////////////////////////////////////
/* db.mongoose_practice.updateOne({
        email: "aminextleveldeveloper@gmail.com"
    }, {
        $push: {skills:{"name": "Python", "level": "Beginner", "isLearning": true}}
    })
    */

///////////////////////////////////////////// Question 06 -> Answer /////////////////////////////////////////////////////////////////////////////////
// db.mongoose_practice.updateMany({}, {$push: {languages:"Spanish"}})

///////////////////////////////////////////// Question 07 -> Answer /////////////////////////////////////////////////////////////////////////////////
// db.mongoose_practice.updateMany({}, {$pull:{skills:{name: "KOTLIN"}}})
db.mongoose_practice.find(
  { "skills.name": "JAVASCRIPT" },
  { "skills.name": 1 }
);
```

## Aggregate Methods

### `$match` | `$project`

> $coming soon$

```js

```

### `$out` | `$addFields`| `$merge`

> $coming soon$

```js

```

### `$group` | `$sum` | `$push`

> In Aggregate Methods the `$group` operator grouping all together based on documents field. The `$` symbol inside the `$group` operator indicates the documents field from collection such as => $age$, $email$, $country$

```js
/*
    Inside aggregate array everything wrap up with 
    {} baches is called stage. every stage is time consuming, so what will be the response time based on stage in aggregation function.

    The less you use stage, the less time will take.
  */
db.mongoose_practice.aggregate([
  {
    /*
     Stage 1  `$` used to refer the property or Field from a document of collection. `$group` method help to group the document into seared collection based on matched field.
     For example you want to group every collection whom gender match with "Female" or "Male", then the group aggregate method will help you to group them into several collection
    */
    //  Stage 1
    $group: {
      _id: "$age",
      /**
       *  @Accumulate via `$sum`
       * after grouping via `_id: "$field"`
       * we can do some accumulations to the collection. It will help us to control what need to show or return via api endpoints. Like if you look at the next line the `$sum` operator will help to count what is the total document which was grouped by `$age`. Oh, and the total property is not other than a variable or property. You can name it as you want
       * */
      total: { $sum: 1 },
      /**
       *  @Accumulate via `$push`
       * The push operator in aggregate functions will help you inject data from collection which you need. Like you first grouped collection of data by age after that you now want to see the name, email, address(anything exist to the document), you can use `$push` operator to mentioned the field you need. But there is a case that you need to show the full document then you will  have to use `$$ROOT` operator.
       *
       * */
      // fullDocument:{$push: "$name"}
      // fullDocument:{$push: "$age"}
      // fullDocument:{$push: "$email"} // OR
      fullDocument: { $push: "$$ROOT" },
    },
  },
]);
```

### `$unwind`

> $coming soon$

```js

```

### `$bucket` in MongoDB

> In MongoDB there is a aggregation operator called `$bucket` which is actually do nothing but categorizes the incoming documents based on `boundaries -> []`, `expressions`

<h1>Syntax</h1>

```javascript
{
  $bucket: {
      groupBy: <expression>, // based on which field you wanna to categorize the documents
      boundaries: [ <lowerbound1>, <lowerbound2>, ... ],
      default: <literal>,
      output: {
         <output1>: { <$accumulator expression> },
         ...
         <outputN>: { <$accumulator expression> }
      }
   }
}
```

```js
db.mongoose_practice.aggregate([
  // STAGE 1
  /*
    Make a group of docs with bucket. Grouping via $age and settings the boundaries which documents has <20, <40, <60, <80
  */
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [20, 40, 60, 80],
      default: "80 er uporer bura gula",
      output: {
        count: { $sum: 1 },
        data: { $push: "$$ROOT" },
      },
    },
  },

  // STAGE 2
  /* Sorting data in defending way */
  {
    $sort: { count: -1 },
  },
  // STAGE 3

  /* Limiting them into 2 docs */
  {
    $limit: 2,
  },

  // STAGE 4
  /* What to show */
  {
    $project: { count: 1 },
  },
]);
```

### `$facet` in MongoDB

>

<h1>Syntax</h1>

```javascript
// $facet syntax
/*
db.mongoose_practice.aggregate([
    {
        $facet: {
            Pipline declaration(should be an array)
             "skills": [
                // Stage 1
                {
                    $unwind: "$skills" // it will break every array into object from this(mongoose_pratice) collection 
                }

                // Stage 2
                {
                    $group: { _id: "$skills", count: { $sum: 1 } }
                }
            ],
            
            
            // you can use more pipline as you want. 
        }
    }
])    

*/
db.mongoose_practice.aggregate([
  {
    $facet: {
      // Pipline 1
      interests: [
        // Stage 1
        {
          $unwind: "$interests",
        },

        // Stage 2
        {
          $group: {
            _id: "$interests",
            count: { $sum: 1 },
            whoseHaveSimillerInterests: {
              $push: { person: "$name.firstName" },
            },
          },
        },
      ],
    },
  },
]);
```

### INDEXING AND COLLSCAN

---

> When we'll work with backend we frequently need to do searching or finding operations to fill-up the user or apps needs. For an example we've to find a user information with his/her posted blogs from a collection. In that case we can use couple of things like `COLLSCAN` and `INDEXING`.
>
> > `COLLSCAN` 🔎 <br/>
> >
> > <h4>What exactly ➡️ COLLSCAN ⬅️ is?</h4>
> > Suppose the collection (you are operating on) is a book and you have to find a specific sentence or word from that book, in that case ➡️ COLLSCAN ⬅️ will search this sentence or word from that book by exploring every page and by reading every sentence or word🥵. Which will impact the database performance as well as it will take unnecessary time to show data to client, right?
> > <br/>
> > <h3>What's the solutions we've❓</h3>
> > <br/>

> > The solution will be `INDEXING 🔎` <br/>
> > We can use `indexing` to find out the specific need from a database collection. You can assume indexing like a indexing page from a book, where that page mentioned which page does what. And the `indexing` operation just read the index page and simply go to that page to find out the need for user. Interssant right? 🫡. In other word `INDEXING` called ➡️`IXSCAN`⬅️

## How to `Indexing`

```javascript
//  Single Indexing via command or method
 1. db.getCollection("massive-data").createIndex({email:1})

 // To explore the execution statistics
 2. db.getCollection('massive-data').find({gender:"male", age: {$gte: 18}}).explain("executionStats")

// Compound Indexing or multiple Indexing by order of indexing
 3. db.getCollection("massive-data").createIndex({gender: -1, age: 1})

// How to remove indexing from index `dropIndex`
 4. db["massive-data"].dropIndex({email:1})

 // How to index text to find specific text from a lot value

 5. db.getCollection("massive-data").createIndex({about: "text"})
```
