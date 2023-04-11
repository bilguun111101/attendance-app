const { marshall, unmarshall } = require('')

exports.handler = async(event) => {
    const {
        Bucket,
        ContentType
    } = JSON.parse(event.body);
}