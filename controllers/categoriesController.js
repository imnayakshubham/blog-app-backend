

const categoriesList = {
    categories: [
        {
            key: "all",
            label: "All",
            description: "All blog categories",
            value: "all"
        },
        {
            key: "technology",
            label: "Technology",
            description: "Blogs about the latest tech news, gadgets, and innovations.",
            value: "technology"
        },
        {
            key: "fashion",
            label: "Fashion",
            description: "Blogs about fashion trends, style tips, and designer updates.",
            value: "fashion"
        },
        {
            key: "travel",
            label: "Travel",
            description: "Blogs about travel destinations, itineraries, and travel tips.",
            value: "travel"
        },
        {
            key: "food",
            label: "Food",
            description: "Blogs about recipes, cooking techniques, and restaurant reviews.",
            value: "food"
        },
        {
            key: "fitness",
            label: "Fitness",
            description: "Blogs about exercise routines, fitness tips, and healthy lifestyle.",
            value: "fitness"
        },
        {
            key: "lifestyle",
            label: "Lifestyle",
            description: "Blogs about personal experiences, self-improvement, and general lifestyle topics.",
            value: "lifestyle"
        },
        {
            key: "finance",
            label: "Finance",
            description: "Blogs about personal finance, investment strategies, and money-saving tips.",
            value: "finance"
        },
        {
            key: "parenting",
            label: "Parenting",
            description: "Blogs about parenting advice, tips for raising children, and family-related topics.",
            value: "parenting"
        },
    ],
    categoriesDisplayName: {
        all: "All",
        technology: "Technology",
        fashion: "Fashion",
        travel: "Travel",
        food: "Food",
        fitness: "Fitness",
        lifestyle: "Lifestyle",
        finance: "Finance",
        parenting: "Parenting",
    }
};




const getCategories = async (req, res) => {
    try {
        return res.status(200).json({ message: "Success", status: "Success", result: { categoriesList } })
    } catch (error) {
        console.log({ error })
        return res.status(200).json({ message: error, status: "Failed To Load Categories" })
    }
}

export { getCategories };