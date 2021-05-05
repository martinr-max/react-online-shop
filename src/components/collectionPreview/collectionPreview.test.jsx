import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import CollectionPreviewComponent, { GET_PRODUCTS_BY_CAT } from './CollectionPreview.component';


const mocks = [
    {
      request: {
        query: GET_PRODUCTS_BY_CAT,
        variables: {
          title: 'Hats',
        },
      },
      
    },
  ];
  
  it('renders without error', () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CollectionPreviewComponent title="Hats" />
      </MockedProvider>,
    );
  
    const tree = component.toJSON();
    expect(component).toContain("Loading...");
  });