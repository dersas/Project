import dotenv from "dotenv";
import dbService from "./mongo.js";
import { ObjectId } from "mongodb";

dotenv.config();

await dbService.initializeDb();
const db = await dbService.getDb();

const seedProductsDb = async () => {
  const seedProducts = [
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publication_year: 1960,
      genre: ["Fiction", "Classic"],
      description:
        "A classic novel depicting racial injustice in the American South.",
      cover_image:
        "https://cdn.kobo.com/book-images/63901e1f-e685-4659-8ba8-d1eab571a31e/1200/1200/False/to-kill-a-mockingbird-3.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "1984",
      author: "George Orwell",
      publication_year: 1949,
      genre: ["Dystopian", "Science Fiction"],
      description: "A dystopian novel portraying a totalitarian society.",
      cover_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuDdSW57QI3pCd85iLw4l-w0s0kvl3cCTyTQ&s",
      currency: "EUR",
      price: "15",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      publication_year: 1813,
      genre: ["Classic", "Romance"],
      description:
        "A classic novel exploring themes of love, marriage, and social norms.",
      cover_image:
        "https://cdn.kobo.com/book-images/afcd8653-3b27-4423-bee9-570fb1441aed/1200/1200/False/pride-and-prejudice-71.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publication_year: 1925,
      genre: ["Fiction", "Classic"],
      description:
        "A tale of the American Dream, wealth, and love during the Roaring Twenties.",
      cover_image:
        "https://skyhorse-us.imgix.net/covers/9781949846386.jpg?auto=format&w=298",
      currency: "EUR",
      price: "15",
    },
    {
      title: "Moby-Dick",
      author: "Herman Melville",
      publication_year: 1851,
      genre: ["Fiction", "Adventure"],
      description:
        "The epic tale of Captain Ahab's obsession with the white whale.",
      cover_image:
        "https://m.media-amazon.com/images/I/616R20nvohL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      publication_year: 1954,
      genre: ["Fantasy", "Adventure"],
      description:
        "An epic fantasy saga about the quest to destroy the One Ring.",
      cover_image:
        "https://prodimage.images-bn.com/pimages/9780544273443_p0_v3_s1200x630.jpg",
      currency: "EUR",
      price: "25",
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      publication_year: 1951,
      genre: ["Fiction", "Coming-of-age"],
      description:
        "A classic coming-of-age novel following Holden Caulfield's journey.",
      cover_image:
        "https://cdn.britannica.com/94/181394-050-2F76F7EE/Reproduction-cover-edition-The-Catcher-in-the.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publication_year: 1937,
      genre: ["Fantasy", "Adventure"],
      description:
        "The prequel to The Lord of the Rings, following Bilbo Baggins' journey.",
      cover_image:
        "https://cdn.kobo.com/book-images/a821b502-0d07-4921-ac14-e431625d04e7/1200/1200/False/the-hobbit-illustrated-by-alan-lee.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "One Hundred Years of Solitude",
      author: "Gabriel Garcia Marquez",
      publication_year: 1967,
      genre: ["Magical Realism", "Literary Fiction"],
      description:
        "A multi-generational saga of the Buendía family in the fictional town of Macondo.",
      cover_image:
        "https://m.media-amazon.com/images/I/81MI6+TpYkL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "War and Peace",
      author: "Leo Tolstoy",
      publication_year: 1869,
      genre: ["Historical Fiction", "Epic"],
      description:
        "A monumental work depicting the events of Russian society during the Napoleonic era.",
      cover_image:
        "https://m.media-amazon.com/images/I/71wXZB-VtBL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "25",
    },
    {
      title: "The Odyssey",
      author: "Homer",
      publication_year: "8th century BCE",
      genre: ["Epic", "Mythology"],
      description:
        "An ancient Greek epic poem recounting Odysseus' ten-year journey home after the Trojan War.",
      cover_image:
        "https://m.media-amazon.com/images/I/81g0AATkO9L._AC_UF350,350_QL50_.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "The Divine Comedy",
      author: "Dante Alighieri",
      publication_year: "1320",
      genre: ["Epic", "Poetry"],
      description:
        "An epic poem that follows the journey of the soul through Hell, Purgatory, and Heaven.",
      cover_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTdxKZQ11zn9AiXhonB9UgDhPitSrogemtvw&s",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Brothers Karamazov",
      author: "Fyodor Dostoevsky",
      publication_year: 1880,
      genre: ["Classic", "Philosophical Fiction"],
      description:
        "A complex novel exploring themes of spirituality, morality, and human nature.",
      cover_image:
        "https://m.media-amazon.com/images/I/71OZJsgZzQL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "25",
    },
    {
      title: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      publication_year: 1866,
      genre: ["Classic", "Psychological Fiction"],
      description:
        "A psychological thriller revolving around guilt, conscience, and redemption.",
      cover_image:
        "https://m.media-amazon.com/images/I/71O2XIytdqL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "25",
    },
    {
      title: "The Picture of Dorian Gray",
      author: "Oscar Wilde",
      publication_year: 1890,
      genre: ["Gothic", "Philosophical Fiction"],
      description:
        "A novel about a man whose portrait ages while he retains his youth and beauty.",
      cover_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdvIXO1kQX8RI7ttHPGxzmJF5pCYoUM3FF2w&s",
      currency: "EUR",
      price: "15",
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      publication_year: 1932,
      genre: ["Dystopian", "Science Fiction"],
      description:
        "A dystopian vision of a future society obsessed with pleasure and conformity.",
      cover_image:
        "https://m.media-amazon.com/images/I/81zE42gT3xL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Count of Monte Cristo",
      author: "Alexandre Dumas",
      publication_year: 1844,
      genre: ["Adventure", "Historical Fiction"],
      description:
        "An adventure novel of revenge, love, and redemption set in the early 19th century.",
      cover_image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1692339248i/197029269.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "Anna Karenina",
      author: "Leo Tolstoy",
      publication_year: 1877,
      genre: ["Classic", "Romance"],
      description:
        "A tragic love story set against the backdrop of Russian high society.",
      cover_image:
        "https://prodimage.images-bn.com/pimages/2940013851351_p0_v1_s1200x630.jpg",
      currency: "EUR",
      price: "25",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      publication_year: 1988,
      genre: ["Fiction", "Philosophical"],
      description:
        "A philosophical novel about a shepherd boy's journey to find his personal legend.",
      cover_image:
        "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "The Adventures of Huckleberry Finn",
      author: "Mark Twain",
      publication_year: 1884,
      genre: ["Adventure", "Satire"],
      description:
        "A satirical novel following Huck Finn's journey down the Mississippi River.",
      cover_image:
        "https://m.media-amazon.com/images/I/71tNxn0TpiL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Iliad",
      author: "Homer",
      publication_year: "8th century BCE",
      genre: ["Epic", "Mythology"],
      description:
        "An ancient Greek epic poem about the Trojan War and the hero Achilles.",
      cover_image:
        "https://cdn.kobo.com/book-images/044f1dca-d889-448b-93f0-cc336976bf1e/1200/1200/False/the-iliad-197.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "Don Quixote",
      author: "Miguel de Cervantes",
      publication_year: 1605,
      genre: ["Classic", "Satire"],
      description:
        "A satirical novel about a deluded knight and his faithful squire, Sancho Panza.",
      cover_image:
        "https://cdn.kobo.com/book-images/5ebc28cd-1f11-4df3-84ec-719309ee6ae4/1200/1200/False/don-quixote-136.jpg",
      currency: "EUR",
      price: "25",
    },
    {
      title: "Frankenstein",
      author: "Mary Shelley",
      publication_year: 1818,
      genre: ["Gothic", "Science Fiction"],
      description:
        "A novel about the creation of a monster and the consequences of playing god.",
      cover_image:
        "https://cdn.kobo.com/book-images/040aad58-1cb1-4e46-9e0d-1984ab9981ca/1200/1200/False/frankenstein-the-original-1818-uncensored-edition-2.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "Alice's Adventures in Wonderland",
      author: "Lewis Carroll",
      publication_year: 1865,
      genre: ["Fantasy", "Children's Literature"],
      description:
        "A whimsical tale about a girl named Alice who falls into a magical world.",
      cover_image:
        "https://m.media-amazon.com/images/I/91uMrXq+4RL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Little Prince",
      author: "Antoine de Saint-Exupéry",
      publication_year: 1943,
      genre: ["Fable", "Children's Literature"],
      description:
        "A philosophical novella about a young prince's journey through the universe.",
      cover_image:
        "https://cdn.kobo.com/book-images/869050f5-1da7-4aa3-bc21-5c56388a5ea9/353/569/90/False/the-little-prince-52.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "The Book Thief",
      author: "Markus Zusak",
      publication_year: 2005,
      genre: ["Historical Fiction", "War"],
      description:
        "A story of a girl living in Nazi Germany, narrated by Death.",
      cover_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwt1n1Q29s2EsJEDTEYd4x54swuiMjBgdUQ&s",
      currency: "EUR",
      price: "25",
    },
    {
      title: "Slaughterhouse-Five",
      author: "Kurt Vonnegut",
      publication_year: 1969,
      genre: ["Satire", "Science Fiction"],
      description:
        "An anti-war novel that mixes science fiction and dark humor.",
      cover_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSskxo_whShg71_ZFOkMpO_w89PmgA9-7k2cQ&s",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Grapes of Wrath",
      author: "John Steinbeck",
      publication_year: 1939,
      genre: ["Historical Fiction", "Social Commentary"],
      description:
        "A novel about the plight of migrant workers during the Great Depression.",
      cover_image:
        "https://upload.wikimedia.org/wikipedia/commons/a/ad/The_Grapes_of_Wrath_%281939_1st_ed_cover%29.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      publication_year: 1953,
      genre: ["Dystopian", "Science Fiction"],
      description:
        "A dystopian novel depicting a future society where books are banned.",
      cover_image:
        "https://cdn.kobo.com/book-images/d3fa7c43-17e1-455a-b7fb-7ba8c38cdfad/1200/1200/False/fahrenheit-451-the-gripping-and-inspiring-classic-of-dystopian-science-fiction.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "The Lord of the Flies",
      author: "William Golding",
      publication_year: 1954,
      genre: ["Dystopian", "Psychological Fiction"],
      description:
        "A novel about a group of British boys stranded on an uninhabited island.",
      cover_image:
        "https://m.media-amazon.com/images/I/81Gn65uv+YL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      publication_year: 1979,
      genre: ["Science Fiction", "Comedy"],
      description:
        "A comedic science fiction series about the misadventures of Arthur Dent.",
      cover_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmQFe8P0GZZtDOlNwAvv13Hxp2VkNixNPeFA&s",
      currency: "EUR",
      price: "20",
    },
    {
      title: "A Tale of Two Cities",
      author: "Charles Dickens",
      publication_year: 1859,
      genre: ["Historical Fiction", "Classic"],
      description:
        "A historical novel set during the French Revolution, exploring themes of sacrifice and resurrection.",
      cover_image:
        "https://m.media-amazon.com/images/I/71VK2E8l93L._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Chronicles of Narnia",
      author: "C.S. Lewis",
      publication_year: 1950,
      genre: ["Fantasy", "Children's Literature"],
      description:
        "A series of fantasy novels set in the magical land of Narnia.",
      cover_image:
        "https://img.wook.pt/images/chronicles-of-narnia-lewis-c-s-lewis/MXwyOTQzMzg3M3wyNTgzOTMwMXwxNjk4Mjg5MDM5MDAw/500x",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Handmaid's Tale",
      author: "Margaret Atwood",
      publication_year: 1985,
      genre: ["Dystopian", "Feminist Fiction"],
      description:
        "A dystopian novel set in a totalitarian society where women are subjugated.",
      cover_image:
        "https://m.media-amazon.com/images/I/61su39k8NUL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "25",
    },
    {
      title: "The Name of the Rose",
      author: "Umberto Eco",
      publication_year: 1980,
      genre: ["Historical Fiction", "Mystery"],
      description: "A medieval mystery novel set in an Italian monastery.",
      cover_image:
        "https://cdn.kobo.com/book-images/369ed2e4-5aad-4fa6-ad52-bd827ff28f74/1200/1200/False/the-name-of-the-rose-11.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Trial",
      author: "Franz Kafka",
      publication_year: 1925,
      genre: ["Absurdist Fiction", "Existential"],
      description:
        "A surreal novel exploring themes of guilt, law, and justice.",
      cover_image:
        "https://cdn.kobo.com/book-images/57e53c11-537a-4164-99ed-12651e2e9daa/1200/1200/False/the-trial-151.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      publication_year: 2003,
      genre: ["Historical Fiction", "Drama"],
      description:
        "A novel about friendship, redemption, and the impact of war in Afghanistan.",
      cover_image:
        "https://cdn.kobo.com/book-images/b154b5e2-0453-4434-a1fa-5ed85d17bce9/1200/1200/False/the-kite-runner-2.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Pillars of the Earth",
      author: "Ken Follett",
      publication_year: 1989,
      genre: ["Historical Fiction", "Adventure"],
      description:
        "An epic historical novel set in 12th-century England, centered around the construction of a cathedral.",
      cover_image:
        "https://m.media-amazon.com/images/I/91UN5Yl-y8L._AC_UF894,1000_QL80_.jpg",
      currency: "EUR",
      price: "25",
    },
    {
      title: "The Shadow of the Wind",
      author: "Carlos Ruiz Zafón",
      publication_year: 2001,
      genre: ["Mystery", "Gothic"],
      description:
        "A mystery novel set in post-war Barcelona, revolving around a forgotten book and its author.",
      cover_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXrCaGF6bn1bllZiqNRcjVG78xb3Eb-tnIQ&s",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Secret Garden",
      author: "Frances Hodgson Burnett",
      publication_year: 1911,
      genre: ["Children's Literature", "Classic"],
      description:
        "A classic children's novel about a young girl who discovers a hidden garden.",
      cover_image:
        "https://cdn.kobo.com/book-images/e5ef6d48-9e6d-474d-be35-57926fee6e89/1200/1200/False/the-secret-garden-illustrated-edition.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Giver",
      author: "Lois Lowry",
      publication_year: 1993,
      genre: ["Dystopian", "Young Adult"],
      description:
        "A dystopian novel about a society with strict control over emotions and memories.",
      cover_image:
        "https://m.media-amazon.com/images/I/819XiIZg59L._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Metamorphosis",
      author: "Franz Kafka",
      publication_year: 1915,
      genre: ["Absurdist Fiction", "Existential"],
      description:
        "A novella about a man who wakes up one morning transformed into a giant insect.",
      cover_image:
        "https://cdn.kobo.com/book-images/d67304d4-0f1b-4c42-8843-35a8b8b0beb9/1200/1200/False/metamorphosis-182.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "Gone with the Wind",
      author: "Margaret Mitchell",
      publication_year: 1936,
      genre: ["Historical Fiction", "Romance"],
      description:
        "A historical novel set during the American Civil War, centered around Scarlett O'Hara.",
      cover_image:
        "https://m.media-amazon.com/images/I/91w1IHrUqZL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "The Wind in the Willows",
      author: "Kenneth Grahame",
      publication_year: 1908,
      genre: ["Children's Literature", "Fantasy"],
      description:
        "A children's novel about the adventures of anthropomorphic animals.",
      cover_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGQ1C8MyAOj-deYXB9BK7_TNdxYFK22XJZOQ&s",
      currency: "EUR",
      price: "20",
    },
    {
      title: "Dracula",
      author: "Bram Stoker",
      publication_year: 1897,
      genre: ["Gothic", "Horror"],
      description:
        "A Gothic horror novel about the vampire Count Dracula's attempt to move to England.",
      cover_image:
        "https://cdn.kobo.com/book-images/88a05cf1-a3b6-461b-a8f7-f0e25b06274a/353/569/90/False/dracula-bram-stoker.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Call of the Wild",
      author: "Jack London",
      publication_year: 1903,
      genre: ["Adventure", "Nature"],
      description:
        "An adventure novel about a domestic dog's life in the wilds of the Yukon.",
      cover_image:
        "https://m.media-amazon.com/images/I/51ocBMmRECL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "20",
    },
    {
      title: "The Stand",
      author: "Stephen King",
      publication_year: 1978,
      genre: ["Horror", "Post-Apocalyptic"],
      description:
        "A post-apocalyptic horror novel about a deadly pandemic and its aftermath.",
      cover_image:
        "https://cdn.kobo.com/book-images/af1757ed-1d7c-4f4d-ba58-93aaee8407bf/353/569/90/False/the-stand-1.jpg",
      currency: "EUR",
      price: "25",
    },
    {
      title: "The Color Purple",
      author: "Alice Walker",
      publication_year: 1982,
      genre: ["Fiction", "Historical"],
      description:
        "A novel about the life of African-American women in the Southern United States.",
      cover_image:
        "https://m.media-amazon.com/images/I/71f6DRbcrsL._AC_UF1000,1000_QL80_.jpg",
      currency: "EUR",
      price: "15",
    },
    {
      title: "The Silmarillion",
      author: "J.R.R. Tolkien",
      publication_year: 1977,
      genre: ["Fantasy", "Mythopoeia"],
      description:
        "A collection of mythopoeic stories about the history of Middle-earth.",
      cover_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwBHa702BY5OvXQw3_Fus8mZjxDS1aIZGezg&s",
      currency: "EUR",
      price: "20",
    },
  ];

  try {
    // CLEAR DB:
    console.log("\nClearing DB...");
    await db.collection("Books").deleteMany({});
    console.log("DB clean!\n");

    // SEED DB:
    console.log("Seeding DB...");
    await db.collection("Books").insertMany(seedProducts);
    console.log("DB seeded!");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

await seedProductsDb();
