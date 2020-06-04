class Paper {
    constructor(slug = 'no-slug', title = null) {
        Object.assign(this, { ...slug, title })
    }
}

module.exports = Paper;