
class Collection {
    constructor(model) {
        this.model = model;
    }

    async create(obj) {
        try {
            let newRecord = await this.model.create(obj);
            return newRecord;
        } catch (e) {
            console.error('error in creating new record for model', this.model.name)
        }
    }

    async read(userName) {
        let record;
        try {
            if (userName) {
                record = await this.model.findOne({ where: { userName: userName } })
            } else {
                record = await this.model.findAll()
            }
            return record;
        } catch (e) {
            console.error('error in reading record/s for model', this.model.name)
        }
    }

    async update(userName, obj) {
        try {
            let recordId = await this.model.findOne({ where: { userName: userName } })
            let updateRecord = await recordId.update(obj);
            return updateRecord;
        } catch (e) {
            console.error('error in updating record for model', this.model.name, `userName:${userName}`)
        }
    }

    async delete(id) {
        try {
            let deletedRecord = await this.model.destroy({ where: { userName: userName } });
            return deletedRecord;
        } catch (e) {
            console.error('error in deleting record for model', this.model.name, `userName:${userName}`)
        }
    }

}

module.exports = Collection;