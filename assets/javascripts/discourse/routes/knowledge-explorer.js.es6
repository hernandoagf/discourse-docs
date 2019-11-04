import KnowledgeExplorer from "discourse/plugins/discourse-knowledge-explorer/discourse/models/knowledge-explorer";

export default Ember.Route.extend({
  queryParams: {
    searchTerm: {
      replace: true
    }
  },

  model(params) {
    return KnowledgeExplorer.list(params);
  },

  setupController(controller, model) {
    const categories = Discourse.Category.list();

    let topics = model.topics.topic_list.topics;

    topics = topics.map(t => {
      t.category = categories.findBy("id", t.category_id);
      return t;
    });

    model.topics.topic_list.topics = topics;

    controller.set("model", model);
  }
});
