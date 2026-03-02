// Vue component + instance for Projects page

Vue.component("project-card", {
  props: ["project", "isFavorite"],
  template: `
    <div class="card p-3 shadow-sm h-100">
      <div class="d-flex justify-content-between align-items-start gap-2">
        <div>
          <h3 class="h5 mb-1">{{ project.title }}</h3>
          <div class="text-muted small">
            {{ project.location }} • {{ project.year }} • {{ project.category }}
          </div>
        </div>

        <button
          class="btn btn-sm"
          :class="isFavorite ? 'btn-warning' : 'btn-outline-secondary'"
          @click="$emit('toggle-favorite', project._id)"
          title="Toggle favorite"
        >
          {{ isFavorite ? '★' : '☆' }}
        </button>
      </div>

      <p class="mt-2 mb-0">
        {{ shortDescription }}
      </p>

      <div class="mt-3">
        <a class="btn btn-outline-dark btn-sm" :href="'/projects/' + project._id">View</a>
      </div>
    </div>
  `,
  computed: {
    shortDescription() {
      const d = this.project.description || "";
      return d.length > 120 ? d.slice(0, 120) + "..." : d;
    }
  }
});

new Vue({
  el: "#projectsApp",
  data: {
    projects: window.__PROJECTS__ || [],
    query: "",
    category: "",
    favorites: []
  },
  computed: {
    categories() {
      const set = new Set(this.projects.map(p => p.category).filter(Boolean));
      return Array.from(set).sort();
    },
    filteredProjects() {
      const q = this.query.trim().toLowerCase();
      return this.projects.filter(p => {
        const matchesCategory = !this.category || p.category === this.category;
        if (!matchesCategory) return false;

        if (!q) return true;

        const haystack = `${p.title} ${p.location} ${p.category}`.toLowerCase();
        return haystack.includes(q);
      });
    }
  },
  methods: {
    toggleFavorite(id) {
      if (this.favorites.includes(id)) {
        this.favorites = this.favorites.filter(x => x !== id);
      } else {
        this.favorites.push(id);
      }
      localStorage.setItem("archive_favorites", JSON.stringify(this.favorites));
    }
  },
  created() {
    // lifecycle hook requirement ✅
    try {
      const saved = JSON.parse(localStorage.getItem("archive_favorites") || "[]");
      if (Array.isArray(saved)) this.favorites = saved;
    } catch (e) {
      this.favorites = [];
    }
  }
});