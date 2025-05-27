const titles = [
    "- a developer;",
    "- a problem solver;",
    "- a coder;",
    "- a tech enthusiast;",
    "- a learner;",
];
const typewriterEl = document.getElementById("typewriter-text");
let titleIndex = 0;
let charIndex = 0;
let typing = true;

function typeWriter() {
    const currentTitle = titles[titleIndex];

    if (typing) {
        if (charIndex < currentTitle.length) {
            typewriterEl.textContent += currentTitle.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100); // typing speed
        } else {
            typing = false;
            setTimeout(typeWriter, 2000); // pause before deleting
        }
    } else {
        if (charIndex > 0) {
            typewriterEl.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeWriter, 50); // deleting speed
        } else {
            typing = true;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeWriter, 300); // pause before next typing
        }
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
        });
    });
});

// Add active class to nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", function () {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
}
async function fetchTechQuote() {
    try {
        const response = await fetch(
            "https://api.quotable.io/random?tags=technology|famous-quotes"
        );
        console.log(response);
        const data = await response.json();
        console.log(data);
        document.getElementById("quote").textContent = `${data.content}`;
        document.getElementById(
            "quote-auther"
        ).textContent = `- ${data.author}`;

        console.log(data.author);
    } catch (error) {
        console.error("Error fetching quote:", error);
        document.getElementById("quote").textContent =
            "Control can sometimes be an illusion. But sometimes you need illusion to gain control.";
        document.getElementById("quote-auther").textContent = `- Mr. Who`;
    }
}

window.addEventListener("DOMContentLoaded", fetchTechQuote);

const timelineItems = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2,
    }
);

timelineItems.forEach((item) => {
    observer.observe(item);
});


    document.addEventListener("DOMContentLoaded", () => {
        const items = document.querySelectorAll(".project-card");

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        el.style.setProperty("--delay", `${index * 0.2}s`);
                        el.classList.add("show");
                        observer.unobserve(el); // Animate once
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        items.forEach((item) => observer.observe(item));
    });
// Start the animation
typeWriter();
