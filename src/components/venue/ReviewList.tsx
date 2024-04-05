import { ReviewDataResponse } from "@/dtos/response/review.response";
import { StarFilled } from "@ant-design/icons";
import { List, Avatar, Flex } from "antd";

const ReviewsList = ({ reviewList }: { reviewList: ReviewDataResponse[] }) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={reviewList}
      renderItem={(review) => (
        <List.Item key={review.id}>
          <List.Item.Meta
            avatar={<Avatar src={review?.account?.avatarUrl} />}
            title={
              <div>
                <Flex gap={5}>
                  <div>{review?.account?.fullName}</div> 
                  {/* <Flex gap={5}></Flex> */}
                  <div style={{color: '#ffe234'}}>{review?.rating.toFixed(1)}<StarFilled /></div>
                </Flex>
              </div>
            }
            description={review?.reviewMessage}
          />
          {review?.replyMessage && (
            <List.Item.Meta
              avatar={<Avatar src={review?.accountReply?.avatarUrl} />}
              title={review?.accountReply?.fullName}
              description={review?.replyMessage}
              style={{ paddingLeft: 40 }} // Thêm một khoảng cách bên trái
            />
          )}
        </List.Item>
      )}
    />
  );
};

export default ReviewsList;

// Sử dụng ReviewsList và truyền dữ liệu đánh giá vào props `reviews`
