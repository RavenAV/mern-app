const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()

router.get('/:code', async(req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code})
        console.log('work moment')
        if (link) {

            const click = link.get('clicks') + 1
            console.log(click)
            link.set('clicks', click)
            //console.log(link.get('clicks'))
            //console.log(link.get('code'))
            //console.log(link.get('from'))
            //await Link.findOneAndUpdate(link.get('code'), link)
            await Link.updateOne({code: link.get('code')}, {clicks: link.get('clicks')})

            return res.redirect(link.get('from'))
        }

        res.status(404).json('Ссылка не найдена')

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router