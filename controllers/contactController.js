const { ObjectId } = require('mongodb')
const sanitizeHtml = require('sanitize-html')
const petsCollection = require("../db").db().collection("pets")


const sanitizeOptions = {
  allowedTags: [],
  allowedAttributes: {},
}

exports.submitContact = async function (req, res) {
  // Validation #1
  if (req.body.secret.toUpperCase() !== 'PUPPY') {
    console.log('Spam detected')
    return res.json({ message: 'Sorry!' })
  }
  // Validation #2
  if (!ObjectId.isValid(req.body.petId)) {
    console.log('Invalid id detected')
    return res.json({ message: 'Sorry!' })
  }
  // Validation #3
  req.body.petId = new ObjectId(req.body.petId)
  const doesPetExist = await petsCollection.findOne({_id: req.body.petId})
  if(!doesPetExist) {
    console.log('Pet does not exist!')
    return res.json({ message: 'Sorry!' })
  }

  const ourObject = {
    name: sanitizeHtml(req.body.name, sanitizeOptions),
    email: sanitizeHtml(req.body.email, sanitizeOptions),
    comment: sanitizeHtml(req.body.comment, sanitizeOptions),
  }

  

  console.log(ourObject)

  res.json({ message: 'Thank you for sending us a data' })
}
