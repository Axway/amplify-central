---
title: AI search assistant
linkTitle: AI search assistant
draft: no
weight: 50
---

Leverage Artificial Intelligence models to get more outcomes of your Marketplace search.

## Before you start

You need to have some basis knowledge on the Retrieval Augmented Generation as well as a good understanding of your product quality in terms of specification and documentation.

## Objectives

Learn how provider can enable their consumers to use the Artificial Intelligence search assistant capabilities to provide accurate and relevant advanced information such as code snippet in various languages.

## What is an AI search assistant and how does it work?

First let's define the Retrieval Augmented Generation (RAG) concept.

RAG is a natural language processing (NLP) technique that combines the strengths of both retrieval and generative-based artificial intelligence (AI) models.

* **Retrieval**: when you enter a query, the assistant first uses a retriever model to search a vast database of documents and identify the most relevant pieces of information. This step ensures that the assistant has access to up-to-date and specific data related to your query based on what is already available in your Marketplace.

* **Generation**: a generator model, usually a transformer-based language model, takes the retrieved documents and synthesizes a coherent and contextually relevant response. This combination allows the assistant to produce answers that are both accurate and well-informed.

The RAG model blends the strengths of both retrieval-based and generation-based methods, enhancing the assistant's ability to provide high-quality information.

But to provide high quality information, the models needs to contains data. To add those data, another phase is required:

* **Training**: this phase helps to push data into the various model used by the RAG. Each time a product is published to a Marketplace, an ingestion process happens to chunk the product resources specification and the product documentation. Theses chunks are summarized by an Large Language Model (LLM) and then vectorized by another LLM to be finally stored in a vector/embeddings database.

**TBD** - schema of the architecture..

## Where are located the models?

Axway does not provide yet all infrastructure to leverage the RAG models. Each customer must have their own implementation. Like this their data stays under their control. They can also add more relevant data into their models (for instance extra documentation pages, samples...) that could benefits their consumers.

## How do I integrate my own model?

**TBD**
Settings...
Contract description

### Ingestion process

## Activating the AI Search assistant

For activating this feature, an Axway Platform entitlement is required. For that you have to ask your Axway Account Manager to make the change.

Once the entitlement is activated, a new Marketplace setting is available to configure the model connectivity and a new button in the product search bar is available to launch the AI search assistant.

## Using the AI Search assistant

On the Browse product page, a new icon is available on the search bar to launch the AI Search Assistant.

1. Login to the Marketplace.
2. Navigate to the PRoducts list page
3. Click the Search Assistant button.
4. it opens the AI Search assistant popup windows. The windows is divide into 2 sections:
   1. the prompt section at the bottom
   2. the answer section at the top

From the prompt you can ask questions and the AI Search Assistant will run the query against the collected data and answer accordingly. On the answer, there will be some references. Those references are clickable and will redirect you to the appropriate object in the Marketplace on a new browser tab.

Since it is an assistant, the context between questions is kept. This mean you can ask a first question. When asking the second question, it automatically takes into the context the first question. Like this the model combine the first answer and what is found on the second question together to get a more relevant information.

For instance, you may ask "Is there a product to do X and Y". The model will answer you what has been found and then you can ask "Write an http client in Java using that API". The model will automatically understand that you want Java code using one of the product from the first answer.

## Limitations

**TBD**
if any