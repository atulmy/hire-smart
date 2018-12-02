// Imports
import path from 'path'
import multer from 'multer'
import fs from 'fs'

// App Imports
import params from '../config/params'
import { slug } from '../helpers/utils'
import Candidate from '../../modules/candidate/model'

// File upload configurations and route
export default function (server) {
  console.info('SETUP - Upload..')

  // Set destination
  const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', '..', '..', params.candidate.resume.path),

    filename: function (request, file, callback) {
      callback(null, Date.now() + path.extname(file.originalname))
    }
  })

  const upload = multer({
    storage: storage
  }).single('file')

  // Upload route
  server.post(`/upload`, (request, response) => {
    upload(request, response, function (error) {
      if (!error) {
        response.json({
          success: true,
          file: request.file.filename
        })
      } else {
        response.json({
          success: false,
          file: null
        })
      }
    })
  })

  // Download route
  server.get('/download/:candidateId', async function (request, response) {
    const errorMessage = 'Sorry, the file you are trying to download does not exists.'
    const candidate = await Candidate.findOne({ _id: request.params.candidateId })

    if(candidate) {
      const filePath = path.join(__dirname, '..', '..', '..', params.candidate.resume.path, candidate.resume)

      try {
        const fileCheck = fs.existsSync(filePath)

        if(fileCheck) {
          const fileName = slug(candidate.name) + path.extname(candidate.resume)

          response.download(filePath, fileName)
        } else {
          response.send(errorMessage)
        }
      } catch(error) {
        response.send(errorMessage)
      }
    } else {
      response.send(errorMessage)
    }
  })

}
