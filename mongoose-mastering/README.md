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
