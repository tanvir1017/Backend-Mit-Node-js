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

> **_$eq, $neq, $gt, $lt, $gte, $lte $nin_**
