
(function () {
	"use strict";

	/* ---------------------------------------------------------------------
	 * Dark mode
	 * ------------------------------------------------------------------- */
	const THEME_KEY = "resto-theme";
	const root = document.documentElement;
	const themeToggle = document.getElementById("themeToggle");
	const themeIcon = themeToggle ? themeToggle.querySelector(".theme-toggle-icon") : null;

	function applyTheme(theme) {
		if (theme === "dark") {
			root.setAttribute("data-theme", "dark");
			if (themeIcon) themeIcon.textContent = "☀️";
			if (themeToggle) {
				themeToggle.setAttribute("aria-pressed", "true");
				themeToggle.setAttribute("aria-label", "Switch to light mode");
			}
		} else {
			root.removeAttribute("data-theme");
			if (themeIcon) themeIcon.textContent = "🌙";
			if (themeToggle) {
				themeToggle.setAttribute("aria-pressed", "false");
				themeToggle.setAttribute("aria-label", "Switch to dark mode");
			}
		}
	}

	function getPreferredTheme() {
		const saved = localStorage.getItem(THEME_KEY);
		if (saved === "dark" || saved === "light") return saved;
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	applyTheme(getPreferredTheme());

	if (themeToggle) {
		themeToggle.addEventListener("click", () => {
			const isDark = root.getAttribute("data-theme") === "dark";
			const next = isDark ? "light" : "dark";
			applyTheme(next);
			localStorage.setItem(THEME_KEY, next);
		});
	}

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
		if (!localStorage.getItem(THEME_KEY)) {
			applyTheme(e.matches ? "dark" : "light");
		}
	});

	/* ---------------------------------------------------------------------
	 * Dropdown menu
	 * ------------------------------------------------------------------- */
	const dropDown = document.querySelector(".DropDown");
	const dropToggle = document.getElementById("dropDownToggle");

	if (dropDown && dropToggle) {
		const closeDropdown = () => {
			dropDown.classList.remove("open");
			dropToggle.setAttribute("aria-expanded", "false");
		};

		dropToggle.addEventListener("click", (e) => {

			const isOpen = dropDown.classList.toggle("open");
			dropToggle.setAttribute("aria-expanded", String(isOpen));
		});

		document.addEventListener("click", (e) => {
			if (!dropDown.contains(e.target)) closeDropdown();
		});

		dropDown.addEventListener("keydown", (e) => {
			if (e.key === "Escape") closeDropdown();
		});
	}

	/* ---------------------------------------------------------------------
	 * Menu search
	 * ------------------------------------------------------------------- */
	const searchBar = document.getElementById("searchBar");
	const menuCards = document.querySelectorAll(".menu-item");
	const noResults = document.getElementById("noResults");

	if (searchBar && menuCards.length) {
		searchBar.addEventListener("input", () => {
			const query = searchBar.value.trim().toLowerCase();
			let visibleCount = 0;

			menuCards.forEach((card) => {
				const title = card.querySelector("h3")?.innerText.toLowerCase() || "";
				const matches = title.includes(query);
				card.style.display = matches ? "" : "none";
				if (matches) visibleCount += 1;
			});

			if (noResults) noResults.hidden = visibleCount !== 0;
		});
	}

	/* ---------------------------------------------------------------------
	 * Scroll reveal 
	 * ------------------------------------------------------------------- */
	const revealTargets = document.querySelectorAll(".menu, .contact");
	revealTargets.forEach((el) => el.classList.add("reveal"));

	if ("IntersectionObserver" in window && revealTargets.length) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15 }
		);
		revealTargets.forEach((el) => observer.observe(el));
	} else {
		
		revealTargets.forEach((el) => el.classList.add("is-visible"));
	}

	/* ---------------------------------------------------------------------
	 * Contact form 
	 * ------------------------------------------------------------------- */
	const contactForm = document.getElementById("contactForm");
	const formStatus = document.getElementById("formStatus");

	if (contactForm && formStatus) {
		contactForm.addEventListener("submit", (e) => {
			e.preventDefault();

			if (!contactForm.checkValidity()) {
				formStatus.textContent = "Please fill in your name, email, and message.";
				formStatus.classList.add("error");
				return;
			}

			formStatus.classList.remove("error");
			formStatus.textContent = "Message sent successfully!";
			contactForm.reset();
		});
	}
})();
