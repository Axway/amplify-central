/**
 * Docs page collections require the following minimal dataset:
 *   name: [string] used in routes, ie.: /admin/collections/:slug/edit
 *   label: [string] used in CMS UI left nav
 *   label_singular: [string] used in CMS UI, ie.: 'New Post'
 *   description: [string] used in CMS UI
 */
const docsDefaults = (contentDirectory, imageDirectory) => ({
  folder: `content/en/docs/${contentDirectory}`,
  media_folder: `{{media_folder}}/${imageDirectory}`,
  public_folder: `{{public_folder}}/${imageDirectory}`,
  preview_path: `docs/${contentDirectory}/{{filename}}/`,
  create: true, // Allow users to create new documents in this collection
  delete: false, // Allow users to delete documents in this collection
  format: 'json-frontmatter', // Specify frontmatter for YAML or json-frontmatter for JSON
  fields: [
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'linkTitle', widget: 'hidden', required: false },
    { name: 'no_list', widget: 'hidden', required: false },
    { name: 'simple_list', widget: 'hidden', required: false },
    { name: 'draft', widget: 'hidden', required: false },
    { name: 'weight', widget: 'hidden', required: false },
    { name: 'date', widget: 'hidden', required: false },
    { name: 'description', label: 'Summary', widget: 'text', required: false },
    { name: 'body', label: 'Body', widget: 'markdown' },
  ],
})

/**
 * Post collections require the same minimal dataset as docs pages.
 */
const postDefaults = {
  create: true,
  delete: false,
  fields: [
    { label: 'Title', name: 'title', widget: 'string' },
    { label: 'Author', name: 'author', widget: 'string' },
    { label: 'Publish Date', name: 'date', widget: 'datetime' },
    { label: 'Summary', name: 'description', widget: 'text' },
    { label: 'Image', name: 'image', widget: 'image', required: false },
    { label: 'Body', name: 'body', widget: 'markdown' },
  ],
}

/**
 * Add new collections here.
 */
const collections = [{
  ...docsDefaults('', 'docbook/images/general'), // content directory, image directory
  name: 'docs',
  label: 'Documentation',
  description: 'Top level pages in documentation.',
  format: 'frontmatter',
  create: false,
}, {
    ...docsDefaults('amplify_relnotes', 'amplify_relnotes'),
    name: 'amplify_relnotes',
    label: 'Release Notes',
    label_singular: 'page in Release Notes section',
    description: 'Release Notes for Amplify Central',
    format: 'frontmatter',
}, {
  ...docsDefaults('Overview', 'Overview'),
  name: 'Overview',
  label: 'Amplify Central overview',
  label_singular: 'page in Amplify Central overview section',
  description: 'All pages related to Amplify Central overview',
  format: 'frontmatter',
}, {
  ...docsDefaults('Getting started', 'Getting started'),
  name: 'Getting started',
  label: 'Amplify Central getting started',
  label_singular: 'page in Amplify Central getting started section',
  description: 'All pages related to Amplify Central getting started',
  format: 'frontmatter',
}, {
  ...docsDefaults('integrate_with_central', 'integrate_with_central'),
  name: 'integrate_with_central',
  label: 'Integrate with Amplify Central',
  label_singular: 'page in Integrate with Amplify Central section',
  description: 'All pages related to Integrate with Amplify Central',
  format: 'frontmatter',
}, {
  ...docsDefaults('integrate_with_central/cli_central', 'integrate_with_central'),
  name: 'cli_central',
  label: 'Axway Central CLI',
  label_singular: 'page in Axway Central CLI section',
  description: 'All pages related to Axway Central CLI',
  format: 'frontmatter',
}, {
  ...docsDefaults('connect_manage_environ', 'connect_manage_environ'),
  name: 'connect_manage_environ',
  label: 'Connect and manage your environment',
  label_singular: 'page in Connect and manage your environment section',
  description: 'All pages related to Connect and manage your environment',
  format: 'frontmatter',
}, {
  ...docsDefaults('connect_manage_environ/connect_api_manager', 'connect_manage_environ'),
  name: 'connect_api_manager',
  label: 'Connect API Manager',
  label_singular: 'page in Connect API Manager section',
  description: 'All pages related to Connect API Manager',
  format: 'frontmatter',
}, {
  ...docsDefaults('connect_manage_environ/connect_aws_gateway', 'connect_manage_environ'),
  name: 'connect_aws_gateway',
  label: 'Connect AWS Gateway',
  label_singular: 'page in Connect AWS Gateway section',
  description: 'All pages related to Connect AWS Gateway',
  format: 'frontmatter',
}, {
  ...docsDefaults('connect_manage_environ/connect_azure_gateway', 'connect_manage_environ'),
  name: 'connect_azure_gateway',
  label: 'Connect Azure Gateway',
  label_singular: 'page in Connect Azure Gateway section',
  description: 'All pages related to Connect Azure Gateway',
  format: 'frontmatter',
}, {
...docsDefaults('connect_manage_environ/manage_services', 'connect_manage_environ'),
name: 'manage_services',
label: 'Manage your services',
label_singular: 'page in Manage your services section',
description: 'All pages related to Manage your services',
format: 'frontmatter',
}, {
  ...docsDefaults('connect_manage_environ/connected_agent_common_reference', 'connect_manage_environ'),
  name: 'connected_agent_common_reference',
  label: 'Connected agent - Common reference',
  label_singular: 'page in Connected agent - Common reference section',
  description: 'All pages related to Connected agent - Common reference',
  format: 'frontmatter',
}, {
  ...docsDefaults('connect_manage_environ/mesh_management', 'connect_manage_environment'),
  name: 'mesh_management',
  label: 'Connect Istio Gateway',
  label_singular: 'page in Connect Istio Gateway section',
  description: 'All pages related to Connect Istio Gateway',
  format: 'frontmatter',
}, {
  ...docsDefaults('manage_service_registry', 'manage_service_registry'),
  name: 'manage_service_registry',
  label: 'Manage your Service Registry',
  label_singular: 'page in Manage your Service Registry section',
  description: 'All pages related to Manage your Service Registry',
  format: 'frontmatter',
}, {
  ...docsDefaults('manage_asset_catalog', 'manage_asset_catalog'),
  name: 'manage_asset_catalog',
  label: 'Manage your Asset Catalog',
  label_singular: 'page in Manage your Asset Catalog section',
  description: 'All pages related to Manage your Asset Catalog',
  format: 'frontmatter',
}, {
  ...docsDefaults('manage_product_foundry', 'manage_product_foundry'),
  name: 'manage_product_foundry',
  label: 'Manage your Product Foundry',
  label_singular: 'page in Manage your Product Foundry section',
  description: 'All pages related to Manage your Product Foundry',
  format: 'frontmatter',
}, {
  ...docsDefaults('manage_unified_catalog', 'manage_unified_catalog'),
  name: 'manage_unified_catalog',
  label: 'Manage your Unified Catalog',
  label_singular: 'page in Manage your Unified Catalog section',
  description: 'All pages related to Manage your Unified Catalog',
  format: 'frontmatter',
}, {
  ...docsDefaults('manage_marketplace', 'manage_marketplace'),
  name: 'manage_marketplace',
  label: 'Manage your Marketplace',
  label_singular: 'page in Manage your Marketplace section',
  description: 'All pages related to Manage your Marketplace',
  format: 'frontmatter',
}, {
  ...docsDefaults('consumer_experience', 'consumer_experience'),
  name: 'consumer_experience',
  label: 'Consumer experience',
  label_singular: 'page in Consumer experience section',
  description: 'All pages related to Consumer experience',
  format: 'frontmatter',
}, {
  ...docsDefaults('get_actionable_insights', 'get_actionable_insights'),
  name: 'get_actionable_insights',
  label: 'Get actionable insights',
  label_singular: 'Get actionable insights',
  description: 'All pages related to Get actionable insights',
  format: 'frontmatter',
}, { 
  ...docsDefaults('best_practices', 'best_practices'),
  name: 'best_practices',
  label: 'Best practices',
  label_singular: 'page in Best practices section',
  description: 'All pages related to Best practices',
  format: 'frontmatter',
}, {
  ...docsDefaults('saas_api_gateway', 'saas_api_gateway'),
  name: 'saas_api_gateway',
  label: 'SaaS API Gateway Management',
  label_singular: 'page in SaaS API Gateway Management section',
  description: 'All pages related to SaaS API Gateway Management',
  format: 'frontmatter',
}];

const cms_branch = window.location.hostname.includes('develop') ? 'develop' : 'master'; // Additional config for a develop branch and develop site

const config = {
  backend: {
    name: 'github',
    branch: cms_branch,
    repo: 'Axway/amplify-central', // Path to your GitHub repository.
    open_authoring: true,
  },
  publish_mode: 'editorial_workflow',
  media_folder: '/static/Images', // Media files will be stored in the repo under static/Images
  public_folder: '/Images', // The src attribute for uploaded media will begin with /Images
  site_url: 'https://amplify-central.netlify.app/', // URL to netlify site
  collections,
};

// Make the config object available on the global scope for processing by
// subsequent scripts.Don't rename this to `CMS_CONFIG` - it will cause the
// config to be loaded without proper processing.
window.CMS_CONFIGURATION = config;

CMS.init({ config })
